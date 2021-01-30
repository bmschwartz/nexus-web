import React, { FC, useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, InputNumber, Select, SubmitButton, Transfer } from 'formik-antd'
import { Modal, notification, PageHeader, Spin } from 'antd'

/* Local */
import { OrderType } from 'types/order'
import { Exchange, convertToRemoteExchange } from 'types/exchange'

/* eslint-disable */
import {
  getClosePositionsSchema,
  createTransferData,
  extractMemberPositions,
} from './closePositionFormUtils'
import * as apollo from 'services/apollo'
import { ClosePositionsResponse } from 'services/apollo/position'
import {
  GetGroupPositionsQueryVariables,
  useGetCurrencyQuery,
  useGetGroupPositionsQuery,
} from '../../../graphql/index'
import { extractCurrencyData } from 'types/currency'
import { Group } from 'types/group'
import TextArea from 'antd/lib/input/TextArea'
import { PositionSide } from 'types/position'
/* eslint-enable */

interface ClosePositionsFormProps {
  group: Group
  exchange: Exchange
  symbol: string
  onClickBack: () => void
  onClosePositions: (orderSetId: string) => void
}

export const ClosePositionsForm: FC<ClosePositionsFormProps> = ({
  group,
  symbol,
  exchange,
  onClickBack,
  onClosePositions,
}) => {
  const groupPositionsVariables: GetGroupPositionsQueryVariables = {
    groupInput: {
      groupId: group.id,
    },
    positionsInput: {
      symbol,
      exchange: convertToRemoteExchange(exchange),
    },
  }
  const { data: currencyResponse } = useGetCurrencyQuery({
    variables: { input: { exchange: convertToRemoteExchange(exchange)!, symbol } },
  })
  const { data: groupPositionsData, loading: groupPositionsLoading } = useGetGroupPositionsQuery({
    variables: groupPositionsVariables,
  })
  const [selectedPositionSide, setSelectedPositionSide] = useState<PositionSide>(PositionSide.LONG)
  const [submittingClosePositions, setSubmittingClosePositions] = useState<boolean>(false)
  const [selectedAccountKeys, setSelectedAccountKeys] = useState<string[]>([])

  const groupPositions = extractMemberPositions(exchange, groupPositionsData)
  const currencyData = extractCurrencyData(currencyResponse)
  console.log(currencyData)

  const ClosePositionsSchema = getClosePositionsSchema()
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
          side: selectedPositionSide,
          orderType: OrderType.LIMIT,
          percent: 100,
          price: 0,
          exchangeAccountIds: [],
        }}
        validationSchema={ClosePositionsSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.exchangeAccountIds.length === 0) {
            setSubmitting(false)
            handleNoMembersSelected()
            return
          }

          const { percent, price, exchangeAccountIds } = values

          setSubmittingClosePositions(true)
          const { orderSetId, error }: ClosePositionsResponse = await apollo.closePositions({
            symbol,
            percent,
            price,
            exchangeAccountIds,
          })
          setSubmittingClosePositions(false)

          console.log(orderSetId, error)

          if (orderSetId) {
            notification.success({
              message: 'Closed Positions',
              description: `${symbol} on ${exchange}`,
            })
            onClosePositions(orderSetId)
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
                  <Select name="exchange" size="large" style={{ width: 120 }} value={exchange}>
                    <Select.Option key={exchange} value={exchange}>
                      {exchange}
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="symbol" label="Symbol" className="mb-3">
                  <Select
                    showSearch
                    placeholder="Search Symbol..."
                    name="symbol"
                    style={{ width: 200 }}
                    size="large"
                    value={symbol}
                  >
                    <Select.Option key={symbol} value={symbol}>
                      {symbol}
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="side" label="Side" className="mb-3">
                  <Select
                    name="side"
                    style={{ width: 120 }}
                    size="large"
                    onChange={(side: string) => {
                      handleChange(side)
                      if (side === PositionSide.LONG) {
                        setSelectedPositionSide(PositionSide.LONG)
                      } else {
                        setSelectedPositionSide(PositionSide.SHORT)
                      }
                    }}
                  >
                    {Object.values(PositionSide).map(side => (
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
                    // min={getMinPrice(currencyData, exchange, symbol)}
                    // max={getMaxPrice(currencyData, exchange, symbol)}
                    // step={getPriceTickSize(currencyData, exchange, symbol)}
                    size="large"
                    onChange={val => setFieldValue('price', val, true)}
                    disabled={values.orderType === OrderType.MARKET}
                    style={{ width: 300 }}
                    placeholder="0.00"
                  />
                </Form.Item>

                <Form.Item name="percent" label="Position Percent" className="mb-3">
                  <Input
                    name="percent"
                    min={0}
                    max={100}
                    size="large"
                    style={{ width: 120 }}
                    type="number"
                    placeholder="100"
                    addonAfter="%"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item name="description" label="Description" className="mb-3">
                  <TextArea name="description" rows={4} placeholder="Description (optional)" />
                </Form.Item>

                <Form.Item name="exchangeAccountIds" label="Members" className="mb-3">
                  <Transfer
                    name="exchangeAccountIds"
                    disabled={groupPositionsLoading}
                    showSearch
                    showSelectAll
                    pagination
                    targetKeys={selectedAccountKeys}
                    titles={['', 'In Trade']}
                    listStyle={{
                      width: 350,
                      height: 350,
                    }}
                    dataSource={createTransferData(selectedPositionSide, groupPositions)}
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

                <SubmitButton
                  disabled={submittingClosePositions}
                  loading={submittingClosePositions}
                >
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
