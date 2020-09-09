/* eslint-disable */
import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Form, Input, InputNumber, SubmitButton } from 'formik-antd'
import * as Yup from 'yup'
import { Divider } from 'antd'
import { OrderSide, OrderType } from 'types/order'
import { Exchange } from './createOrderFormUtils'

interface CreateOrderSetFormProps {
  group: any
  dispatch: any
}

const mapStateToProps = ({ group, dispatch }: any) => ({ group, dispatch })

const CreateOrderSetForm: FC<CreateOrderSetFormProps> = ({ group, dispatch }) => {
  const CreateOrderSetSchema = Yup.object().shape({
    exchange: Yup.string()
      .label('Exchange')
      .oneOf([Exchange.BITMEX, Exchange.BINANCE])
      .required(),
    symbol: Yup.string()
      .label('Symbol')
      .required(),
    side: Yup.string()
      .label('Side')
      .oneOf([OrderSide.Buy, OrderSide.Sell])
      .required(),
    type: Yup.string()
      .label('Type')
      .oneOf([OrderType.Limit, OrderType.Limit])
      .required(),
    price: Yup.number().label('Price'),
    percent: Yup.number()
      .label('Percent')
      .required(),
    leverage: Yup.number().label('Leverage'),
  })
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

  return (
    <Formik
      initialValues={{
        exchange: Exchange.BITMEX,
        symbol: 'BTCUSD',
        side: OrderSide.Buy,
        type: OrderType.Limit,
        price: 0.0,
        percent: 1,
        leverage: 1,
      }}
      validationSchema={CreateOrderSetSchema}
      onSubmit={values => {
        dispatch({
          type: 'group/CREATE_ORDER_SET',
          payload: values,
        })
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
        <div className="card">
          <div className="card-body">
            <Form {...formItemLayout} labelAlign="left">
              <Divider orientation="left">
                <strong>General</strong>
              </Divider>
              <Form.Item name="name" label="Group Name">
                <Input name="name" placeholder="Enter Group Name" />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea name="description" placeholder="Enter Description..." />
              </Form.Item>
              <Divider orientation="left">
                <strong>Contact</strong>
              </Divider>
              <Form.Item name="telegram" label="Telegram">
                <Input name="telegram" placeholder="Enter Telegram (Optional)" />
              </Form.Item>
              <Form.Item name="discord" label="Discord">
                <Input name="discord" placeholder="Enter Discord (Optional)" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input name="email" placeholder="Enter Email (Optional)" />
              </Form.Item>
              <Divider orientation="left">
                <strong>Membership</strong>
              </Divider>
              <Form.Item name="membershipFee" label="Membership Fee" className="mb-3">
                <Input name="membershipFee" type="number" placeholder="0.00" addonBefore="$" />
              </Form.Item>
              <Form.Item name="membershipLength" label="Length (Months)" className="mb-3">
                <InputNumber name="membershipLength" min={1} max={12} defaultValue={1} />
              </Form.Item>
              {/* <Form.Item name="payInPlatform" label="Pay In Platform">
                <Checkbox value={values.payInPlatform} name="payInPlatform" />
              </Form.Item>
              <Form.Item name="payoutCurrency" label="Payout Currency" className="mb-3">
                <Select
                  name="payoutCurrency"
                  defaultValue="BTC"
                  style={{ width: 120 }}
                  onChange={e => {
                    setCurrentPayoutCurrency(e)
                    handleChange(e)
                  }}
                  disabled={!values.payInPlatform}
                >
                  <Select.Option value="BTC">BTC</Select.Option>
                  <Select.Option value="ETH">ETH</Select.Option>
                  <Select.Option value="LTC">LTC</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="payoutAddress" label="Payout Address">
                <Input
                  name="payoutAddress"
                  disabled={!values.payInPlatform}
                  placeholder="e.g. 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                />
              </Form.Item>
              <Divider /> */}
              <SubmitButton disabled={group.createGroup.submitting}>Create Group</SubmitButton>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default connect(mapStateToProps)(CreateOrderSetForm)
