/* eslint-disable */
import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Button, Divider, Modal, Table, Tooltip } from 'antd'
import { Form, Input, Checkbox, SubmitButton } from 'formik-antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import * as Yup from 'yup'
import { groupExists } from '../../../../services/apollo'
import { validateAddress } from '../validation'
import { membershipTableColumns, validPayoutCurrencies } from './createGroupFormUtils'

interface CreateGroupFormProps {
  // redux
  group: any
  dispatch: any
}

const labelTooltip = (label: string, tooltipText: string) => {
  return (
    <>
      <span className="mr-2">{label}</span>
      <Tooltip title={tooltipText} color="blue">
        <InfoCircleOutlined color="blue" />
      </Tooltip>
    </>
  )
}

const MAX_MEMBERSHIP_OPTIONS = 6

const defaultMembershipItem = { duration: 1, fee: 5, description: '' }

const mapStateToProps = ({ group, dispatch }: any) => ({ group, dispatch })

const CreateGroupForm: FC<CreateGroupFormProps> = ({ group, dispatch }) => {
  const [currentPayoutCurrency] = useState<string | null>('BTC')
  const [membershipOptionsData, setMembershipOptionsData] = useState<any[]>([defaultMembershipItem])

  const CreateGroupSchema = Yup.object().shape({
    name: Yup.string()
      .label('Name')
      .min(5)
      .max(255)
      .test('Available Name', 'Name not available', async name => {
        if (!name) {
          return false
        }
        const { exists, error } = await groupExists(name)
        if (error) {
          return false
        }
        return !exists
      })
      .required(),
    description: Yup.string()
      .label('Description')
      .max(5000)
      .required(),
    payInPlatform: Yup.bool().required(),
    payoutCurrency: Yup.string()
      .label('Payout Currency')
      .when('payInPlatform', {
        is: true,
        then: Yup.string()
          .oneOf(validPayoutCurrencies)
          .required('Choose a Payout Currency'),
        otherwise: Yup.string().notRequired(),
      }),
    payoutAddress: Yup.string()
      .label('Payout Address')
      .when('payInPlatform', {
        is: true,
        then: Yup.string()
          .required('Payout Address is Required')
          .test('ValidPayoutAddress', `Invalid ${currentPayoutCurrency} Address`, address => {
            if (!address || !currentPayoutCurrency) {
              return false
            }
            return validateAddress(address, currentPayoutCurrency)
          }),
        otherwise: Yup.string()
          .nullable()
          .notRequired(),
      }),
    email: Yup.string()
      .label('Email')
      .max(255)
      .email()
      .nullable()
      .notRequired(),
    discord: Yup.string()
      .label('Discord')
      .max(100)
      .nullable()
      .notRequired(),
    telegram: Yup.string()
      .label('Telegram')
      .max(100)
      .nullable()
      .notRequired(),
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
      <h3>Create a Group</h3>
      <Formik
        initialValues={{
          name: '',
          description: '',
          telegram: '',
          discord: '',
          email: '',
          payInPlatform: true,
          payoutCurrency: 'BTC',
          payoutAddress: '',
        }}
        validationSchema={CreateGroupSchema}
        onSubmit={values => {
          dispatch({
            type: 'group/CREATE_GROUP',
            payload: values,
          })
        }}
      >
        {({ values }) => (
          <div>
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
                <p className="mt-3 mb-3">Membership details can be changed at any time</p>
                <p className="mt-3 mb-3">
                  Members will automatically be billed at the end of the pay period
                </p>
                <Form.Item
                  name="payInPlatform"
                  label={labelTooltip(
                    'Pay In Platform',
                    'Members will pay for access through the website',
                  )}
                >
                  <Checkbox value={values.payInPlatform} name="payInPlatform" />
                </Form.Item>
                <Form.Item
                  name="payoutAddress"
                  label={labelTooltip(
                    'Payout Address',
                    'Your earnings will be sent to this BTC address',
                  )}
                  hidden={!values.payInPlatform}
                >
                  <Input
                    name="payoutAddress"
                    disabled={!values.payInPlatform}
                    placeholder="e.g. 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                  />
                </Form.Item>
                <Form.Item
                  className="ml-auto"
                  name="membershipOptions"
                  label={labelTooltip(
                    'Membership Options',
                    'Payment options available to group members',
                  )}
                  hidden={!values.payInPlatform}
                >
                  <Table
                    pagination={false}
                    columns={membershipTableColumns}
                    dataSource={membershipOptionsData}
                  />
                  <Button
                    type="primary"
                    className="mt-3 mr-2"
                    name="addMembershipOption"
                    onClick={() => {
                      if (membershipOptionsData.length >= MAX_MEMBERSHIP_OPTIONS) {
                        Modal.error({
                          title: 'Add Membership Option',
                          content: `You can have at most ${MAX_MEMBERSHIP_OPTIONS} membership options`,
                          maskClosable: true,
                        })
                        return
                      }
                      setMembershipOptionsData([...membershipOptionsData, defaultMembershipItem])
                    }}
                  >
                    Add Option
                  </Button>
                  <Button
                    danger
                    hidden={membershipOptionsData.length <= 1}
                    className="mt-3"
                    onClick={() =>
                      setMembershipOptionsData([...membershipOptionsData.slice(0, -1)])
                    }
                  >
                    Delete Last
                  </Button>
                </Form.Item>
                <Divider />
                <SubmitButton disabled={group.createGroup.submitting}>Create Group</SubmitButton>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default connect(mapStateToProps)(CreateGroupForm)
