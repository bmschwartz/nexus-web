import React, { FC, useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, InputNumber, Select, SubmitButton, Transfer } from 'formik-antd'
import { Modal, notification, PageHeader, Spin } from 'antd'
import { TransferItem } from 'antd/lib/transfer'

/* Local */
import { OrderSide, OrderType } from 'types/order'
import { Exchange, convertToRemoteExchange } from 'types/exchange'
import { Membership } from 'types/membership'

/* eslint-disable */
import { getClosePositionsSchema } from './closePositionFormUtils'
import * as apollo from 'services/apollo'
import { ClosePositionsResponse } from 'services/apollo/position'
import { useGetCurrencyQuery } from '../../../graphql/index'
import { extractCurrencyData, getMinPrice, getMaxPrice, getPriceTickSize } from 'types/currency'
import { Group } from 'types/group'
/* eslint-enable */

interface ClosePositionsFormProps {
  groupId: string
  exchange: Exchange
  symbol: string
  onClickBack: () => void
  onClosePositions: () => void
}

const getOverviewText = ({ symbol, price, exchangeAccountIds, percent, exchange }: any): String => {
  return `Closing ${symbol} positions on ${exchange} at ${price} with ${percent}% of balance for ${exchangeAccountIds.length} accounts`
}

export const ClosePositionsForm: FC<ClosePositionsFormProps> = ({
  symbol,
  exchange,
  onClickBack,
}) => {
  const { data: currencyResponse } = useGetCurrencyQuery({
    variables: { input: { exchange: convertToRemoteExchange(exchange)!, symbol } },
  })
  const [submittingClosePositions, setSubmittingClosePositions] = useState<boolean>(false)
  // const [selectedAccountKeys, setSelectedAccountKeys] = useState<string[]>([])

  const currencyData = extractCurrencyData(currencyResponse)
  console.log(currencyData)

  const ClosePositionsSchema = getClosePositionsSchema(currencyData)
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

  const createTransferData = (group?: Group): TransferItem[] => {
    if (!group) {
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
      content: 'Select one or more members',
    })
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Close Positions" onBack={onClickBack} />
        </div>
      </div>
      <Formik
        initialValues={{
          exchange,
          symbol,
          side: OrderSide.BUY,
          orderType: OrderType.LIMIT,
          percent: 5,
          price: 0,
          membershipIds: [],
        }}
        validationSchema={ClosePositionsSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.membershipIds.length === 0) {
            setSubmitting(false)
            handleNoMembersSelected()
            return
          }

          setSubmittingClosePositions(true)
          const { orderSetId, error }: ClosePositionsResponse = await apollo.createOrderSet({
            groupId: group.id,
            leverage: 1,
            ...values,
          })
          setSubmittingClosePositions(false)

          if (orderSetId) {
            notification.success({
              message: 'Created Order Set',
              description: `${values.symbol} on ${values.exchange}`,
            })
            onCreated()
          } else {
            notification.error({
              message: 'Create Order Set Error',
              description: error,
              duration: 3, // seconds
            })
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
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
                    onChange={e => {
                      handleChange(e)
                      setFieldValue(
                        'price',
                        getMinPrice(currencyData, values.exchange, values.symbol),
                      )
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

                <Form.Item name="price" label="Price" className="mb-3">
                  <InputNumber
                    name="price"
                    min={getMinPrice(currencyData, values.exchange, values.symbol)}
                    max={getMaxPrice(currencyData, values.exchange, values.symbol)}
                    step={getPriceTickSize(currencyData, values.exchange, values.symbol)}
                    size="large"
                    onChange={val => setFieldValue('price', val, true)}
                    disabled={values.orderType === OrderType.MARKET}
                    style={{ width: 300 }}
                    placeholder="0.00"
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
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item name="description" label="Description" className="mb-3">
                  <TextArea name="description" rows={4} placeholder="Description (optional)" />
                </Form.Item>

                <Form.Item name="membershipIds" label="Members" className="mb-3">
                  <Transfer
                    name="membershipIds"
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
