import React, { FC, useState } from 'react'
import { Formik } from 'formik'
import { Form, SubmitButton, Input } from 'formik-antd'
import { notification, PageHeader } from 'antd'
import { UserOutlined } from '@ant-design/icons'

/* Local */
import { Group } from 'types/group'

/* eslint-disable */
import * as apollo from 'services/apollo'
import { InviteMemberResponse } from 'services/apollo/group'
import { getGroupMemberInviteSchema } from './inviteMemberFormUtils'

interface GroupMemberInviteFormProps {
  group: Group
  onClickBack: () => void
  onInvited: () => void
}

export const GroupMemberInviteForm: FC<GroupMemberInviteFormProps> = ({
  group,
  onClickBack,
  onInvited,
}) => {
  const [submittingUserInvite, setSubmittingUserInvite] = useState<boolean>()

  const GroupMemberInviteFormSchema = getGroupMemberInviteSchema()
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
          <PageHeader className="site-page-header" title="Invite Member" onBack={onClickBack} />
        </div>
      </div>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={GroupMemberInviteFormSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmittingUserInvite(true)
          const { success, error }: InviteMemberResponse = await apollo.inviteMember({
            email: values.email,
            groupId: group.id,
          })
          setSubmittingUserInvite(false)

          if (success) {
            notification.success({
              message: 'Invited User',
              description: `${values.email}`,
            })
            onInvited()
          } else {
            notification.error({
              message: 'Error',
              description: error,
              duration: 3, // seconds
            })
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <div className="card-body">
            <Form {...formItemLayout} labelAlign="left">
              <Form.Item name="email" label="User Email" className="mb-3">
                <Input
                  name="email"
                  placeholder="Enter Email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <SubmitButton disabled={submittingUserInvite} loading={submittingUserInvite}>
                Submit
              </SubmitButton>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}
