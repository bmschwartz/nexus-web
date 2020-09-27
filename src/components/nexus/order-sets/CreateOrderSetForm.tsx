import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton, Transfer } from 'formik-antd'
import { PageHeader } from 'antd'

/* Local */
import { OrderSide, OrderType } from 'types/order'
import { Exchange } from 'types/exchange'
import { Group } from 'types/group'

/* eslint-disable */
import { getCreateOrderSetSchema } from './createOrderFormUtils'
import { Membership } from 'types/membership'
import { TransferItem } from 'antd/lib/transfer'
/* eslint-enable */

interface CreateOrderSetFormProps {
  group: Group
  onClickBack: () => void
  dispatch: any
}
const mapStateToProps = ({ dispatch }: any) => ({ dispatch })

const getOverviewText = ({ side, symbol, price, members, percent, exchange }: any): String => {
  return `${side} ${symbol} on ${exchange} at ${price} with ${percent}% of balance for ${members.length} members`
}

const CreateOrderSetForm: FC<CreateOrderSetFormProps> = ({ group, onClickBack, dispatch }) => {
  const [selectedAccountKeys, setSelectedAccountKeys] = useState<string[]>([])

  const CreateOrderSetSchema = getCreateOrderSetSchema()
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

  const createTransferData = (exchange: Exchange): TransferItem[] => {
    const data = group.memberships.map((membership: Membership) => {
      const accountsExchages = membership.exchangeAccounts
        ? membership.exchangeAccounts.map(account => account.exchange.toLowerCase())
        : []
      return {
        key: membership.id,
        title: membership.username,
        disabled: !accountsExchages.includes(exchange.toLowerCase()),
      }
    })

    return data
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
          exchange: Object.values(Exchange)[0],
          symbol: 'BTCUSD',
          side: Object.values(OrderSide)[0],
          type: Object.values(OrderType)[0],
          percent: 5,
          price: 0,
          members: [],
        }}
        validationSchema={CreateOrderSetSchema}
        onSubmit={values => {
          dispatch({
            type: 'group/CREATE_ORDER_SET',
            payload: values,
          })
        }}
      >
        {({ values, handleChange }) => (
          <div className="card">
            <div className="card-body">
              <Form {...formItemLayout} labelAlign="left">
                <Form.Item name="exchange" label="Exchange">
                  <Select
                    name="exchange"
                    style={{ width: 120 }}
                    onChange={e => {
                      handleChange(e)
                      setSelectedAccountKeys([])
                    }}
                  >
                    {Object.values(Exchange).map(exchange => (
                      <Select.Option key={exchange} value={exchange}>
                        {exchange}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="symbol" label="Symbol" className="mb-3">
                  <Select name="symbol" style={{ width: 120 }} onChange={handleChange}>
                    <Select.Option value="BTCUSD">BTCUSD</Select.Option>
                    <Select.Option value="ETHUSD">ETHUSD</Select.Option>
                    <Select.Option value="LTCUSD">LTCUSD</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="side" label="Side" className="mb-3">
                  <Select name="side" style={{ width: 120 }} onChange={handleChange}>
                    {Object.values(OrderSide).map(side => (
                      <Select.Option key={side} value={side}>
                        {side}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="type" label="Type" className="mb-3">
                  <Select name="type" style={{ width: 120 }} onChange={handleChange}>
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
                    style={{ width: 120 }}
                    type="number"
                    placeholder="5"
                    addonAfter="%"
                  />
                </Form.Item>

                <Form.Item name="members" label="Members" className="mb-3">
                  <Transfer
                    name="members"
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
                <SubmitButton disabled={false}>Submit</SubmitButton>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default connect(mapStateToProps)(CreateOrderSetForm)
