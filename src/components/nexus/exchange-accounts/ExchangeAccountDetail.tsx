import React, { FC, useState } from 'react'
import { notification, PageHeader, Spin } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'

import * as Yup from 'yup'
import * as apollo from 'services/apollo'

/* eslint-disable */
import { UpdateExchangeAccountResponse } from 'services/apollo/exchangeAccount'
/* eslint-enable */

interface ExchangeAccountDetailProps {
  exchange?: string
  onClickBack: () => void
  exchangeAccountId: string
}

const UpdateExchangeAccountSchema = () => {
  return Yup.object().shape({
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

export const ExchangeAccountDetail: FC<ExchangeAccountDetailProps> = ({
  exchange,
  onClickBack,
  exchangeAccountId,
}) => {
  const [updatingExchangeAccount, setUpdatingExchangeAccount] = useState<boolean>(false)

  return (
    <Spin spinning={updatingExchangeAccount} tip="Fetching Exchange Details...">
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader
            className="site-page-header"
            title={`${exchange || 'Exchange'} Account Detail`}
            onBack={onClickBack}
          />
        </div>
      </div>
      <Formik
        initialValues={{
          apiKey: '',
          apiSecret: '',
        }}
        validationSchema={UpdateExchangeAccountSchema}
        onSubmit={async values => {
          setUpdatingExchangeAccount(true)
          const {
            operationId,
            error,
          }: UpdateExchangeAccountResponse = await apollo.updateExchangeAccount({
            id: exchangeAccountId,
            ...values,
          })
          setUpdatingExchangeAccount(false)

          if (operationId) {
            notification.success({
              message: 'Updated Exchange Account',
            })
          } else {
            notification.error({
              message: 'Update Exchange Account Error',
              description: error,
              duration: 3, // seconds
            })
          }
        }}
      >
        {({ handleChange }) => (
          <div className="card-body">
            <Form {...formItemLayout} labelAlign="left">
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

              <SubmitButton disabled={updatingExchangeAccount}>Submit</SubmitButton>
            </Form>
          </div>
        )}
      </Formik>
    </Spin>
  )
}
