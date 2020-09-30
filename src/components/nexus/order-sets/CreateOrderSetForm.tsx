import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton, Transfer } from 'formik-antd'
import { Modal, PageHeader, Spin } from 'antd'
import { TransferItem } from 'antd/lib/transfer'
import TextArea from 'antd/lib/input/TextArea'

/* Local */
import { OrderSide, OrderType } from 'types/order'
import { Exchange } from 'types/exchange'
import { Group } from 'types/group'
import { Membership } from 'types/membership'

/* eslint-disable */
import { extractCurrencyData, getCreateOrderSetSchema } from './createOrderFormUtils'
import { useGetCurrenciesQuery } from '../../../graphql/index'
/* eslint-enable */

interface CreateOrderSetFormProps {
  group: Group
  onClickBack: () => void

  // redux
  orderSet: any
  dispatch: any
}
const mapStateToProps = ({ dispatch, orderSet }: any) => ({ orderSet, dispatch })

const getOverviewText = ({
  side,
  symbol,
  price,
  exchangeAccountIds,
  percent,
  exchange,
}: any): String => {
  return `${side} ${symbol} on ${exchange} at ${price} with ${percent}% of balance for ${exchangeAccountIds.length} members`
}

const CreateOrderSetForm: FC<CreateOrderSetFormProps> = ({
  group,
  onClickBack,
  orderSet,
  dispatch,
}) => {
  const { data } = useGetCurrenciesQuery()
  const [selectedAccountKeys, setSelectedAccountKeys] = useState<string[]>([])

  const currencyData = extractCurrencyData(data)
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

  const createTransferData = (exchange?: Exchange): TransferItem[] => {
    if (!exchange) {
      return []
    }

    const transferData = group.memberships.map((membership: Membership) => {
      const accountsExchages = membership.exchangeAccounts
        ? membership.exchangeAccounts.map(account => account.exchange.toLowerCase())
        : []
      return {
        key: membership.id,
        title: membership.username,
        disabled: !accountsExchages.includes(exchange.toLowerCase()),
      }
    })

    return transferData
  }

  const handleNoMembersSelected = () => {
    Modal.error({
      title: 'Select Members',
      content: 'Select one or more members for order',
    })
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Create Order Set" onBack={onClickBack} />
        </div>
      </div>
      <Formik
        initialValues={{
          exchange: currencyData?.exchanges[0],
          symbol: undefined,
          side: OrderSide.BUY,
          type: OrderType.LIMIT,
          percent: 5,
          price: 0,
          exchangeAccountIds: [],
        }}
        validationSchema={CreateOrderSetSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (values.exchangeAccountIds.length === 0) {
            setSubmitting(false)
            handleNoMembersSelected()
            return
          }
          dispatch({
            type: 'orderSet/CREATE_ORDER_SET',
            payload: {
              groupId: group.id,
              ...values,
            },
          })
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <div className="card">
            <div className="card-body">
              <Spin spinning={!currencyData}>
                <Form {...formItemLayout} labelAlign="left">
                  <Form.Item name="exchange" label="Exchange">
                    <Select
                      name="exchange"
                      size="large"
                      style={{ width: 120 }}
                      onChange={e => {
                        handleChange(e)
                        setSelectedAccountKeys([])
                        setFieldValue('symbol', '')
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
                      onChange={handleChange}
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

                  <Form.Item name="type" label="Type" className="mb-3">
                    <Select name="type" style={{ width: 120 }} size="large" onChange={handleChange}>
                      {Object.values(OrderType).map(type => (
                        <Select.Option key={type} value={type}>
                          {type}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="price" label="Price" className="mb-3">
                    <Input
                      name="price"
                      type="number"
                      min={0}
                      size="large"
                      disabled={values.type === OrderType.MARKET}
                      style={{ width: 300 }}
                      placeholder="0.00"
                      addonBefore="$"
                    />
                  </Form.Item>

                  <Form.Item name="percent" label="Balance Percent" className="mb-3">
                    <Input
                      name="percent"
                      min={0}
                      max={100}
                      size="large"
                      style={{ width: 120 }}
                      type="number"
                      placeholder="5"
                      addonAfter="%"
                    />
                  </Form.Item>

                  <Form.Item name="description" label="Description" className="mb-3">
                    <TextArea name="description" rows={4} placeholder="Description (optional)" />
                  </Form.Item>

                  <Form.Item name="exchangeAccountIds" label="Members" className="mb-3">
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
                      render={item =>
                        item.disabled ? `${item.title} (No account)` : `${item.title}`
                      }
                      onChange={(keys, direction, moveKeys) => {
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

                  <p>Overview: {getOverviewText(values)}</p>
                  <SubmitButton disabled={orderSet.createOrderSet.submitting}>Submit</SubmitButton>
                </Form>
              </Spin>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default connect(mapStateToProps)(CreateOrderSetForm)
