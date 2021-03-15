import React, { FC, useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, InputNumber, Select, SubmitButton, Transfer } from 'formik-antd'
import { Divider, Modal, notification, PageHeader, Spin, Tooltip } from 'antd'
import { TransferItem } from 'antd/lib/transfer'
import TextArea from 'antd/lib/input/TextArea'

/* Local */
import { OrderSide, OrderType, StopTriggerType } from 'types/order'
import { Exchange } from 'types/exchange'
import { Group } from 'types/group'

/* eslint-disable */
import {
  getCreateOrderSetSchema,
  MemberSelectionType,
  StopOrderOption,
} from './createOrderFormUtils'
import * as apollo from 'services/apollo'
import { CreateOrderSetResponse } from 'services/apollo/order'
import {
  useGetCurrenciesBasicQuery,
  useGetGroupExchangeAccountsQuery,
} from '../../../graphql/index'
import {
  extractCurrenciesData,
  getCurrentPrice,
  getMaxPrice,
  getMinPrice,
  getPriceTickSize,
} from 'types/currency'
import labelTooltip from '../labelTooltip'

/* eslint-enable */

interface CreateOrderSetFormProps {
  group: Group
  onCreated: () => void
  onClickBack: () => void
}

export const CreateOrderSetForm: FC<CreateOrderSetFormProps> = ({
  group,
  onClickBack,
  onCreated,
}) => {
  const { data: currenciesResponse } = useGetCurrenciesBasicQuery()
  const {
    data: groupExchangeAccountsData,
    loading: fetchingGroupExchangeAccounts,
  } = useGetGroupExchangeAccountsQuery({
    variables: {
      groupInput: { groupId: group.id },
      exchangeAccountsInput: { activeOnly: true },
    },
  })

  const [selectedExchange, setSelectedExchange] = useState<Exchange>(Exchange.BITMEX)
  const [selectedMemberSelectionType, setSelectedMemberSelectionType] = useState<
    MemberSelectionType
  >(MemberSelectionType.ALL)
  const [submittingOrder, setSubmittingOrder] = useState<boolean>(false)
  const [selectedAccountKeys, setSelectedAccountKeys] = useState<string[]>([])

  const currencyData = extractCurrenciesData(currenciesResponse)
  const CreateOrderSetSchema = getCreateOrderSetSchema(currencyData)

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }

  const getExchangeAccountIds = (exchange?: Exchange): string[] => {
    const accountsTransferData = createTransferData(exchange)
    return Object.values(accountsTransferData).map(item => item.key) as string[]
  }

  const createTransferData = (exchange?: Exchange): TransferItem[] => {
    if (!exchange || !groupExchangeAccountsData?.group || !groupExchangeAccountsData.group) {
      return []
    }

    if (!groupExchangeAccountsData.group.members?.members) {
      return []
    }

    const memberAccounts = groupExchangeAccountsData.group.members.members
      .map(membership => {
        const activeAccounts = membership.exchangeAccounts.filter(account => account.active)
        if (activeAccounts.length === 0) {
          return
        }
        // eslint-disable-next-line consistent-return
        return {
          accountId: activeAccounts[0].id,
          username: membership.member.username,
        }
      })
      .filter(Boolean)

    return memberAccounts
      .filter(item => item !== undefined && item !== null)
      .map(item => {
        return {
          key: item!.accountId,
          title: item!.username,
        }
      })
  }

  const handleNoMembersSelected = () => {
    Modal.error({
      title: 'Select Members',
      content: 'Select one or more members for order',
      maskClosable: true,
    })
  }

  const onChangeMemberSelectionType = async (selectionType: MemberSelectionType) => {
    setSelectedMemberSelectionType(selectionType)

    switch (selectionType) {
      case MemberSelectionType.MANUAL:
        setSelectedAccountKeys([])
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Create Orders" onBack={onClickBack} />
        </div>
      </div>
      <Formik
        initialValues={{
          exchange: selectedExchange,
          symbol: '',
          side: OrderSide.BUY,
          orderType: OrderType.LIMIT,
          percent: 5,
          leverage: 1,
          memberSelectionType: selectedMemberSelectionType,
          exchangeAccountIds: [],
          stopOrderType: StopOrderOption.NONE,
          stopTriggerType: StopTriggerType.LAST_PRICE,
        }}
        validateOnChange={false}
        validationSchema={CreateOrderSetSchema}
        onSubmit={async (
          { stopOrderType, exchangeAccountIds, memberSelectionType, ...values },
          { setSubmitting },
        ) => {
          let exchangeAccountIdsToSend: string[] = exchangeAccountIds

          if (memberSelectionType === MemberSelectionType.ALL) {
            exchangeAccountIdsToSend = getExchangeAccountIds(values.exchange)
          }
          if (exchangeAccountIdsToSend.length === 0) {
            setSubmitting(false)
            handleNoMembersSelected()
            return
          }

          setSubmittingOrder(true)
          const { orderSetId, error }: CreateOrderSetResponse = await apollo.createOrderSet({
            groupId: group.id,
            closeOrderSet: false,
            exchangeAccountIds: exchangeAccountIdsToSend,
            ...values,
          })
          setSubmittingOrder(false)

          if (orderSetId) {
            notification.success({
              message: 'Created Orders',
              description: `${values.symbol} on ${values.exchange}`,
            })
            onCreated()
          } else {
            notification.error({
              message: 'Create Orders Error',
              description: error,
              duration: 3, // seconds
            })
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <div className="card-body">
            <Spin spinning={!currencyData || fetchingGroupExchangeAccounts}>
              <Form {...formItemLayout} labelAlign="left">
                <Divider orientation="left">
                  <strong>General</strong>
                </Divider>
                <Form.Item name="exchange" label="Exchange">
                  <Select
                    name="exchange"
                    size="large"
                    style={{ width: 120 }}
                    onChange={(exchange: Exchange) => {
                      setFieldValue('symbol', '')
                      setSelectedAccountKeys([])
                      setSelectedExchange(exchange)
                      setSelectedMemberSelectionType(MemberSelectionType.ALL)
                      handleChange(exchange)
                    }}
                  >
                    {currencyData &&
                      currencyData.exchanges.map(exchange => (
                        <Select.Option key={exchange} value={exchange}>
                          {exchange}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item name="symbol" label="Symbol" className="mb-3">
                  <Select
                    showSearch
                    placeholder="Search Symbol..."
                    name="symbol"
                    style={{ width: 200 }}
                    size="large"
                    onChange={newSymbol => {
                      setFieldValue(
                        'price',
                        getCurrentPrice(currencyData, values.exchange, newSymbol),
                      )
                      handleChange(newSymbol)
                    }}
                  >
                    {currencyData &&
                      Object.keys(currencyData[values.exchange])
                        .sort()
                        .map(symbol => (
                          <Select.Option key={symbol} value={symbol}>
                            {symbol}
                          </Select.Option>
                        ))}
                  </Select>
                </Form.Item>

                <Form.Item name="side" label="Side" className="mb-3">
                  <Select name="side" style={{ width: 120 }} size="large" onChange={handleChange}>
                    {Object.values(OrderSide).map(side => (
                      <Select.Option key={side} value={side}>
                        {side}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Divider orientation="left">
                  <strong>Order</strong>
                </Divider>
                <Form.Item name="orderType" label="Type" className="mb-3">
                  <Select
                    name="orderType"
                    style={{ width: 120 }}
                    size="large"
                    onChange={handleChange}
                  >
                    {Object.values(OrderType).map(type => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Price"
                  className="mb-3"
                  hidden={values.orderType !== OrderType.LIMIT}
                >
                  <InputNumber
                    name="price"
                    min={getMinPrice(currencyData, values.exchange, values.symbol)}
                    max={getMaxPrice(currencyData, values.exchange, values.symbol)}
                    step={getPriceTickSize(currencyData, values.exchange, values.symbol)}
                    size="large"
                    onChange={val => setFieldValue('price', val, true)}
                    disabled={values.orderType === OrderType.MARKET}
                    style={{ width: 200 }}
                    placeholder="0.00"
                  />
                </Form.Item>

                <Form.Item
                  name="percent"
                  label={labelTooltip(
                    'Balance Percent',
                    'Percent of available balance to use in the trade',
                  )}
                  className="mb-3"
                >
                  <Input
                    name="percent"
                    min={0}
                    max={100}
                    size="large"
                    style={{ width: 120 }}
                    type="number"
                    placeholder="5"
                    addonAfter="%"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  name="leverage"
                  label={labelTooltip(
                    'Leverage',
                    'Sets position leverage before placing the order',
                  )}
                  className="mb-3"
                >
                  <Tooltip title="Sets position leverage" color="blue">
                    <Input
                      name="leverage"
                      min={0}
                      max={100}
                      size="large"
                      style={{ width: 120 }}
                      type="number"
                      placeholder="1"
                      onChange={handleChange}
                    />
                  </Tooltip>
                </Form.Item>

                <Divider orientation="left">
                  <strong>Stop Order</strong>
                </Divider>
                <Form.Item
                  name="stopOrderType"
                  label={labelTooltip('Stop Order Type', 'Optional - Add a Stop Order')}
                  className="mb-3"
                >
                  <Select
                    name="stopOrderType"
                    style={{ width: 200 }}
                    size="large"
                    onChange={handleChange}
                  >
                    {Object.values(StopOrderOption).map(type => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="stopPrice"
                  label="Stop Price"
                  className="mb-3"
                  hidden={values.stopOrderType !== StopOrderOption.STOP_LIMIT}
                >
                  <InputNumber
                    name="stopPrice"
                    min={getMinPrice(currencyData, values.exchange, values.symbol)}
                    max={getMaxPrice(currencyData, values.exchange, values.symbol)}
                    step={getPriceTickSize(currencyData, values.exchange, values.symbol)}
                    size="large"
                    onChange={val => setFieldValue('stopPrice', val, true)}
                    disabled={values.stopOrderType !== StopOrderOption.STOP_LIMIT}
                    style={{ width: 200 }}
                    placeholder="0.00"
                  />
                </Form.Item>

                <Form.Item
                  name="trailingStopPercent"
                  label="Trailing Stop Percent"
                  className="mb-3"
                  hidden={values.stopOrderType !== StopOrderOption.TRAILING_STOP}
                >
                  <Input
                    name="trailingStopPercent"
                    min={0}
                    max={100}
                    size="large"
                    style={{ width: 120 }}
                    type="number"
                    placeholder="5"
                    addonAfter="%"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                  name="stopTriggerType"
                  label="Stop Trigger Type"
                  className="mb-3"
                  hidden={values.stopOrderType === StopOrderOption.NONE}
                >
                  <Select
                    name="stopTriggerType"
                    style={{ width: 200 }}
                    size="large"
                    onChange={handleChange}
                  >
                    {Object.values(StopTriggerType).map(type => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Divider orientation="left">
                  <strong>Members</strong>
                </Divider>

                <Form.Item
                  name="memberSelectionType"
                  label={labelTooltip(
                    'Member Selection',
                    'Include all members or select members manually',
                  )}
                  className="mb-3"
                >
                  <Select
                    name="memberSelectionType"
                    style={{ width: 200 }}
                    size="large"
                    onChange={async (selectionType: MemberSelectionType) => {
                      await onChangeMemberSelectionType(selectionType)
                      handleChange(selectionType)
                    }}
                  >
                    {Object.values(MemberSelectionType).map(type => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  className="mb-3"
                  name="exchangeAccountIds"
                  hidden={values.memberSelectionType !== MemberSelectionType.MANUAL}
                  label={labelTooltip('Members', 'Use dropdown for more options')}
                >
                  <Transfer
                    name="exchangeAccountIds"
                    showSearch
                    showSelectAll
                    pagination
                    targetKeys={selectedAccountKeys}
                    titles={['', 'In Trade']}
                    listStyle={{
                      width: 350,
                      height: 350,
                    }}
                    dataSource={createTransferData(values.exchange)}
                    render={(item: TransferItem) =>
                      item.disabled ? `${item.title} (No account)` : `${item.title}`
                    }
                    onChange={(keys: string[], direction: string, moveKeys: string[]) => {
                      if (direction === 'right') {
                        // extend selected keys with new keys
                        setSelectedAccountKeys([...selectedAccountKeys, ...moveKeys])
                      } else if (direction === 'left') {
                        // remove keys from selected keys
                        setSelectedAccountKeys([
                          ...selectedAccountKeys.filter(k => !moveKeys.includes(k)),
                        ])
                      }
                    }}
                  />
                </Form.Item>

                <Divider orientation="left">
                  <strong>Additional</strong>
                </Divider>
                <Form.Item name="description" label="Description" className="mb-3">
                  <TextArea name="description" rows={4} placeholder="Description (optional)" />
                </Form.Item>

                <SubmitButton disabled={submittingOrder} loading={submittingOrder}>
                  Submit
                </SubmitButton>
              </Form>
            </Spin>
          </div>
        )}
      </Formik>
    </>
  )
}
