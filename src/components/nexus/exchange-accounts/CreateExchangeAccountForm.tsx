import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'

import { Exchange } from 'types/exchange'
import { Membership } from 'types/membership'
import { notification, PageHeader } from 'antd'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton } from 'formik-antd'

/* eslint-disable */
import * as apollo from 'services/apollo'
import { CreateExchangeAccountResponse } from 'services/apollo/exchangeAccount'
import { useGetAsyncOperationStatusQuery } from '../../../graphql'
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
  onCreated,
}) => {
  const [asyncOperationId, setAsyncOperationId] = useState<string>('')
  const { startPolling, stopPolling, data: asyncOperationData } = useGetAsyncOperationStatusQuery({
    variables: { input: { id: asyncOperationId } },
    fetchPolicy: 'network-only',
  })
  // const [fetchAsyncOperationStatus, { data: asyncOperationData }] = useGetAsyncOperationStatusLazyQuery({ variables: { input: { id: asyncOperationId } } })
  const [submittingExchangeAccount, setSubmittingExchangeAccount] = useState<boolean>(false)
  const CreateExchangeAccountSchema = getCreateExchangeAccountSchema()
  const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false)
  const [showErrorNotification, setShowErrorNotification] = useState<boolean>(false)

  useEffect(() => {
    if (asyncOperationId.length) {
      console.log('polling!')
      startPolling(500)
    } else {
      console.log('stopped polling!')
      stopPolling()
    }
  }, [asyncOperationId, stopPolling, startPolling])

  if (
    asyncOperationId !== '' &&
    asyncOperationData?.asyncOperationStatus?.operation.complete === true
  ) {
    setAsyncOperationId('')

    setSubmittingExchangeAccount(false)

    const {
      asyncOperationStatus: { operation },
    } = asyncOperationData

    if (operation.success) {
      console.log('success!')
      setShowSuccessNotification(true)
      onCreated()
    } else {
      console.log('erro!')
      setShowErrorNotification(true)
    }
  }

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
      {showSuccessNotification &&
        notification.success({
          message: 'Created Exchange Account',
        })}
      {showErrorNotification &&
        notification.error({
          message: 'Create Exchange Account Error',
          description: asyncOperationData?.asyncOperationStatus?.operation.error || '',
          duration: 3, // seconds
        })}
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

          console.log(operationId, error)

          if (operationId) {
            setAsyncOperationId(operationId)

            if (asyncOperationData?.asyncOperationStatus?.operation.complete === true) {
              setAsyncOperationId('')
              setSubmittingExchangeAccount(false)

              const {
                asyncOperationStatus: { operation },
              } = asyncOperationData

              if (operation.success) {
                notification.success({
                  message: 'Created Exchange Account',
                })
                onCreated()
              } else {
                notification.error({
                  message: 'Create Exchange Account Error',
                  description: operation.error || '',
                  duration: 3, // seconds
                })
              }
            }
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
            <Form {...formItemLayout} labelAlign="left">
              <Form.Item name="exchange" label="Exchange">
                <Select name="exchange" size="large" style={{ width: 120 }} onChange={handleChange}>
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

              <SubmitButton
                loading={submittingExchangeAccount}
                disabled={submittingExchangeAccount}
              >
                Submit
              </SubmitButton>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}
