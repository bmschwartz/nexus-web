/* eslint-disable */
import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Form, Input, Checkbox, InputNumber, Select, SubmitButton } from 'formik-antd'
import * as Yup from 'yup'
import { Divider } from 'antd'
import { validateAddress } from './validation'
import { groupExists } from 'services/apollo/group'
import { CreateGroupState } from 'redux/group/reducers'

const validPayoutCurrencies = ['BTC', 'ETH', 'LTC']

interface CreateGroupStateInput {
  createGroup: CreateGroupState
  dispatch: any
}

interface CreateGroupFormProps {
  createGroup: CreateGroupState
  dispatch: any
}

const mapStateToProps = ({
  createGroup,
  dispatch,
}: CreateGroupStateInput): CreateGroupFormProps => ({
  dispatch,
  createGroup,
})

const CreateGroupForm: FC<CreateGroupFormProps> = ({ createGroup, dispatch }) => {
  const [currentPayoutCurrency, setCurrentPayoutCurrency] = useState<string | null>('BTC')

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
            console.log(currentPayoutCurrency)
            return validateAddress(address, currentPayoutCurrency)
          }),
        otherwise: Yup.string()
          .nullable()
          .notRequired(),
      }),
    membershipLength: Yup.number()
      .label('Membership Length')
      .min(1)
      .max(12)
      .integer()
      .required(),
    membershipFee: Yup.number()
      .label('Membership Fee')
      .when('payInPlatform', {
        is: true,
        then: Yup.number()
          .min(0)
          .max(100000)
          .integer()
          .required('Membership Fee must be greater than 0 when "Pay in Platform" is turned on'),
        otherwise: Yup.number()
          .min(0)
          .max(100000)
          .integer()
          .required('Membership Fee is required'),
      })
      .required(),
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
    <Formik
      initialValues={{
        name: '',
        description: '',
        telegram: '',
        discord: '',
        email: '',
        membershipLength: 1,
        membershipFee: 0.0,
        payInPlatform: true,
        payoutCurrency: 'BTC',
        payoutAddress: '',
        submit: null,
      }}
      validationSchema={CreateGroupSchema}
      onSubmit={values => {
        dispatch({
          type: 'group/CREATE_GROUP',
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
                <Input name="name" placeholder="Enter Group Name" onError={console.log} />
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
              <Form.Item
                name="membershipLength"
                label="Membership Length (Months)"
                className="mb-3"
              >
                <InputNumber name="membershipPeriod" min={1} max={12} defaultValue={1} />
              </Form.Item>
              <Form.Item name="membershipFee" label="Membership Fee" className="mb-3">
                <Input name="membershipFee" type="number" placeholder="0.00" addonBefore="$" />
              </Form.Item>
              <Form.Item name="payInPlatform" label="Pay In Platform">
                <Checkbox value={values.payInPlatform} name="payInPlatform" />
              </Form.Item>
              <Form.Item name="payoutCurrency" label="Payout Currency" className="mb-3">
                <Select
                  name="payoutCurrency"
                  defaultValue="BTC"
                  style={{ width: 120 }}
                  onChange={e => {
                    setCurrentPayoutCurrency(e)
                    try {
                      // CreateGroupSchema.validate({ payoutAddress: values.payoutAddress })
                    } catch (e) {}
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
              <Divider />
              <SubmitButton disabled={createGroup.submitting}>Create Group</SubmitButton>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default connect(mapStateToProps)(CreateGroupForm)
