import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { notification, PageHeader } from 'antd'
import { Form, SubmitButton, InputNumber } from 'formik-antd'

/* Local */

/* eslint-disable */
import * as apollo from 'services/apollo'
/* eslint-enable */

interface CreateSubscriptionOptionFormProps {
  onClickBack: () => void
  onCreatedOption: () => void
}

export const getSubscriptionOptionFormSchema = () => {
  return Yup.object().shape({
    duration: Yup.number()
      .label('Duration')
      .required(),
    fee: Yup.number()
      .label('Fee')
      .min(0)
      .max(999999)
      .required(),
  })
}

export const CreateSubscriptionOptionForm: FC<CreateSubscriptionOptionFormProps> = ({
  onClickBack,
  onCreatedOption,
}) => {
  const [savingSubscriptionOption, setSavingSubscriptionOption] = useState<boolean>()

  const SubscriptionOptionFormSchema = getSubscriptionOptionFormSchema()
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
          <PageHeader
            className="site-page-header"
            title="Create Subscription Option"
            onBack={onClickBack}
          />
        </div>
      </div>
      <Formik
        initialValues={{
          fee: 100,
          duration: 1,
          description: '',
        }}
        validationSchema={SubscriptionOptionFormSchema}
        onSubmit={async values => {
          setSavingSubscriptionOption(true)
          const { fee, duration, description } = values
          const { success, error } = await apollo.createGroupSubscription({
            fee,
            duration,
            description,
          })

          if (success) {
            notification.success({
              message: 'Created Subscription Option',
            })
            onCreatedOption()
          } else {
            notification.error({
              message: 'Error',
              description: error,
              duration: 3, // seconds
            })
          }
          setSavingSubscriptionOption(false)
        }}
      >
        {() => (
          <div className="card-body">
            <Form {...formItemLayout} labelAlign="left">
              <Form.Item name="duration" label="Duration (Months)" className="mb-3">
                <InputNumber name="duration" min={1} step={1} max={12} />
              </Form.Item>
              <Form.Item name="fee" label="Fee (USD)" className="mb-3">
                <InputNumber name="fee" min={0} step={1} max={999999} />
              </Form.Item>
              <SubmitButton disabled={savingSubscriptionOption} loading={savingSubscriptionOption}>
                Submit
              </SubmitButton>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}
