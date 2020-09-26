import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton, Transfer } from 'formik-antd'
import * as Yup from 'yup'
import { PageHeader } from 'antd'
import { OrderSide, OrderType } from 'types/order'

/* eslint-disable */
import { Exchange } from './createOrderFormUtils'
/* eslint-enable */

interface CreateOrderSetFormProps {
  onClickBack: () => void
  dispatch: any
}
const mapStateToProps = ({ dispatch }: any) => ({ dispatch })

const CreateOrderSetForm: FC<CreateOrderSetFormProps> = ({ onClickBack, dispatch }) => {
  const CreateOrderSetSchema = Yup.object().shape({
    exchange: Yup.string()
      .label('Exchange')
      .oneOf(Object.values(Exchange))
      .required(),
    symbol: Yup.string()
      .label('Symbol')
      .required(),
    side: Yup.string()
      .label('Side')
      .oneOf(Object.values(OrderSide))
      .required(),
    type: Yup.string()
      .label('Type')
      .oneOf(Object.values(OrderType))
      .required(),
    price: Yup.number()
      .label('Price')
      .when('side', {
        is: OrderType.LIMIT,
        then: Yup.number()
          .positive()
          .required(),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    percent: Yup.number()
      .label('Percent')
      .positive()
      .integer()
      .max(100)
      .required(),
    users: Yup.array().required(),
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
          price: 0.0,
          percent: 5,
        }}
        validationSchema={CreateOrderSetSchema}
        onSubmit={values => {
          dispatch({
            type: 'group/CREATE_ORDER_SET',
            payload: values,
          })
        }}
      >
        {({ handleChange }) => (
          <div className="card">
            <div className="card-body">
              <Form {...formItemLayout} labelAlign="left">
                <Form.Item name="exchange" label="Exchange">
                  <Select name="exchange" style={{ width: 120 }} onChange={handleChange}>
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
                    style={{ width: 300 }}
                    placeholder="0.00"
                    addonBefore="$"
                  />
                </Form.Item>

                <Form.Item name="percent" label="Percent" className="mb-3">
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
