import React, { FC, useState } from 'react'
import * as Yup from 'yup'

import { Exchange } from 'types/exchange'
import { Membership } from 'types/membership'
import { notification, PageHeader, Spin } from 'antd'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton } from 'formik-antd'

/* eslint-disable */
import * as apollo from 'services/apollo'
import { CreateExchangeAccountResponse } from 'services/apollo/exchangeAccount'
/* eslint-enable */

interface CreateExchangeAccountFormProps {
  membership: Membership
  onClickBack: () => void
  onCreated: () => void
}

const EXCHANGES = [Exchange.BINANCE, Exchange.BITMEX]

const getCreateExchangeAccountSchema = () => {
  return Yup.object().shape({
    exchange: Yup.string()
      .label('Exchange')
      .oneOf(EXCHANGES)
      .required(),
    apiKey: Yup.string()
      .label('API Key')
      .required(),
    apiSecret: Yup.string()
      .label('API Secret')
      .required(),
  })
}

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

export const CreateExchangeAccountForm: FC<CreateExchangeAccountFormProps> = ({
  membership,
  onClickBack,
}) => {
  const [submittingExchangeAccount, setSubmittingExchangeAccount] = useState<boolean>(false)
  const CreateExchangeAccountSchema = getCreateExchangeAccountSchema()

  return (
    <div className="card">
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader
            className="site-page-header"
            title="Create Exchange Account"
            onBack={onClickBack}
          />
        </div>
      </div>
      <Formik
        initialValues={{
          exchange: EXCHANGES[0],
          apiKey: '',
          apiSecret: '',
        }}
        validationSchema={CreateExchangeAccountSchema}
        onSubmit={async values => {
          setSubmittingExchangeAccount(true)
          const {
            operationId,
            error,
          }: CreateExchangeAccountResponse = await apollo.createExchangeAccount({
            membershipId: membership.id,
            ...values,
          })
          setSubmittingExchangeAccount(false)

          if (operationId) {
            console.log('start polling...')
            // notification.success({
            //   message: 'Created Exchange Account',
            //   description: `On ${values.exchange}`,
            // })
            // onCreated()
          } else {
            notification.error({
              message: 'Create Exchange Account Error',
              description: error,
              duration: 3, // seconds
            })
          }
        }}
      >
        {({ handleChange }) => (
          <div className="card-body">
            <Spin spinning={submittingExchangeAccount}>
              <Form {...formItemLayout} labelAlign="left">
                <Form.Item name="exchange" label="Exchange">
                  <Select
                    name="exchange"
                    size="large"
                    style={{ width: 120 }}
                    onChange={handleChange}
                  >
                    {EXCHANGES.map(exchange => (
                      <Select.Option key={exchange} value={exchange}>
                        {exchange}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="apiKey" label="API Key" className="mb-3">
                  <Input
                    name="apiKey"
                    size="large"
                    style={{ width: 360 }}
                    placeholder="nQ8PsQbuns8f2deF3cXAqOqGJ1YbBjfDVHWHrc1EWpi7W0rb6gntuAaaEj2bBcd17"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item name="apiSecret" label="API Secret" className="mb-3">
                  <Input
                    name="apiSecret"
                    size="large"
                    style={{ width: 360 }}
                    placeholder="1A9tObLcK8pW3H0vCSdsehqrjc33lpIrlTeTRHzdhY22YC85LW4fra5xC9m4WA0o"
                    onChange={handleChange}
                  />
                </Form.Item>

                <SubmitButton disabled={submittingExchangeAccount}>Submit</SubmitButton>
              </Form>
            </Spin>
          </div>
        )}
      </Formik>
    </div>
  )
}
