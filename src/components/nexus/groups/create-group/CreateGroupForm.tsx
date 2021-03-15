import React, { useState } from 'react'
import { Formik } from 'formik'
import { Button, Divider, Modal, notification, Table } from 'antd'
import { Form, Input, Checkbox, SubmitButton } from 'formik-antd'
import * as Yup from 'yup'

/* eslint-disable */
import labelTooltip from '../../labelTooltip'
import { validateAddress } from '../validation'
import * as apollo from '../../../../services/apollo'
import { SubscriptionOption, subscriptionTableColumns } from './createGroupFormUtils'

/* eslint-enable */

const MAX_SUBSCRIPTION_OPTIONS = 10

const defaultSubscriptionOptionItem: SubscriptionOption = { duration: 1, fee: 100 }

const CreateGroupForm = () => {
  const [currentPayoutCurrency] = useState<string | null>('BTC')
  const [submittingCreateGroup, setSubmittingCreateGroup] = useState<boolean>(false)
  const [subscriptionOptionsData, setSubscriptionOptionsData] = useState<SubscriptionOption[]>([
    { ...defaultSubscriptionOptionItem },
  ])

  const hasInvalidSubscriptionOption = (subscriptionOptions: SubscriptionOption[]): boolean => {
    return subscriptionOptions
      .map(option => option.fee >= 0 && option.duration >= 0)
      .includes(false)
  }

  const onSubscriptionOptionChange = (index: number, field: string, value: any) => {
    switch (field) {
      case 'duration':
        subscriptionOptionsData[index].duration = value
        break
      case 'fee':
        subscriptionOptionsData[index].fee = value
        break
      case 'description':
        subscriptionOptionsData[index].description = value
        break
      default:
        break
    }
  }

  const CreateGroupSchema = Yup.object().shape({
    name: Yup.string()
      .label('Name')
      .min(5)
      .max(255)
      .test('Available Name', 'Name not available', async name => {
        if (!name) {
          return false
        }
        const { exists, error } = await apollo.groupExists(name)
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
          payoutAddress: '',
        }}
        validationSchema={CreateGroupSchema}
        onSubmit={async values => {
          if (hasInvalidSubscriptionOption(subscriptionOptionsData)) {
            Modal.error({
              title: 'Subscription Options Error',
              content: 'Duration and Fee are Required for All Subscription Options',
            })
            return
          }

          setSubmittingCreateGroup(true)

          const { groupId, error } = await apollo.createGroup({
            subscriptionOptions: subscriptionOptionsData,
            ...values,
          })
          if (groupId) {
            notification.success({
              duration: 1.5,
              message: 'Created Group!',
              onClose: () => window.location.reload(),
            })
          } else {
            notification.error({
              message: 'Create Group Error',
              description: error,
              duration: 3, // seconds
            })
            setSubmittingCreateGroup(false)
          }
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
                    'Payout Address (BTC)',
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
                  name="subscriptionOptions"
                  label={labelTooltip(
                    'Subscription Options',
                    'Payment options available to group members',
                  )}
                >
                  <Table
                    pagination={false}
                    columns={subscriptionTableColumns(onSubscriptionOptionChange)}
                    dataSource={subscriptionOptionsData}
                  />
                  <Button
                    type="primary"
                    className="mt-3 mr-2"
                    name="addSubscriptionOption"
                    onClick={() => {
                      if (subscriptionOptionsData.length >= MAX_SUBSCRIPTION_OPTIONS) {
                        Modal.error({
                          title: 'Add Subscription Option',
                          content: `You can have at most ${MAX_SUBSCRIPTION_OPTIONS} subscription options`,
                          maskClosable: true,
                        })
                        return
                      }
                      setSubscriptionOptionsData([
                        ...subscriptionOptionsData,
                        { ...defaultSubscriptionOptionItem },
                      ])
                    }}
                  >
                    Add Option
                  </Button>
                  <Button
                    danger
                    hidden={subscriptionOptionsData.length <= 1}
                    className="mt-3"
                    onClick={() =>
                      setSubscriptionOptionsData([...subscriptionOptionsData.slice(0, -1)])
                    }
                  >
                    Delete Last
                  </Button>
                </Form.Item>
                <Divider />
                <SubmitButton disabled={submittingCreateGroup}>Create Group</SubmitButton>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default CreateGroupForm
