import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { PageHeader } from 'antd'
import { Form, SubmitButton, Input, InputNumber } from 'formik-antd'

/* Local */

/* eslint-disable */
// import * as apollo from 'services/apollo'
// import { InviteMemberResponse } from 'services/apollo/group'
/* eslint-enable */

interface CreateSubscriptionOptionFormProps {
  onClickBack: () => void
  onSaved: () => void
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
    description: Yup.string()
      .label('Description')
      .notRequired(),
  })
}

export const CreateSubscriptionOptionForm: FC<CreateSubscriptionOptionFormProps> = ({
  onClickBack,
  // onSaved,
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
          // const { success, error }: InviteMemberResponse = await apollo.inviteMember({
          //   email: values.email,
          //   groupId: group.id,
          // })
          console.log(values)
          setSavingSubscriptionOption(false)

          // if (success) {
          //   notification.success({
          //     message: 'Invited User',
          //     description: `${values.email}`,
          //   })
          //   onInvited()
          // } else {
          //   notification.error({
          //     message: 'Error',
          //     description: error,
          //     duration: 3, // seconds
          //   })
          // }
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
              <Form.Item name="description" label="Description" className="mb-3">
                <Input name="description" maxLength={100} />
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
