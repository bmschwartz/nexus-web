/* eslint-disable */
import React, { FC, useState, useEffect } from 'react'
import { ApolloConsumer } from '@apollo/client'
import { Formik, useFormikContext } from 'formik'
import { Form, Input, Checkbox, InputNumber, Select } from 'formik-antd'
import flatten from 'flat'
import * as Yup from 'yup'
import { Divider } from 'antd'
import { validateAddress } from './validation'
import { groupExists } from 'services/apollo/group'

const FormikPatchTouched = () => {
  const { errors, setFieldTouched, isSubmitting, isValidating } = useFormikContext()
  useEffect(() => {
    if (isSubmitting && !isValidating) {
      for (const path of Object.keys(flatten(errors))) {
        setFieldTouched(path, true, false)
      }
    }
  }, [errors, isSubmitting, isValidating, setFieldTouched])
  return null
}

interface CreateGroupFormProps {}

const validPayoutCurrencies = ['BTC', 'ETH', 'LTC']

const CreateGroupSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .max(255)
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
      then: Yup.string().required('Payout Address is Required'),
      otherwise: Yup.string()
        .nullable()
        .notRequired(),
    }),
  membershipFee: Yup.number()
    .label('Membership Fee')
    .min(0)
    .max(100000)
    .integer()
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

const CreateGroupForm: FC<CreateGroupFormProps> = () => {
  const [searchedName, setSearchedName] = useState<boolean>(false)
  const [nameAvailable, setNameAvailable] = useState<boolean>(false)
  const [isValidPayoutAddress, setIsValidPayoutAddress] = useState<boolean>(false)

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

  const getNameValidateStatus = () => {
    if (searchedName) {
      return nameAvailable ? 'success' : 'error'
    }
    return ''
  }

  const getNameValidateHelpText = () => {
    return searchedName && !nameAvailable ? 'Name is not available' : ''
  }

  return (
    <ApolloConsumer>
      {client => (
        <Formik
          initialValues={{
            name: '',
            description: '',
            payInPlatform: true,
            payoutCurrency: 'BTC',
            payoutAddress: '',
            membershipFee: 0.0,
            telegram: '',
            discord: '',
            email: '',
            submit: null,
          }}
          validationSchema={CreateGroupSchema}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log(values)
            try {
              setSubmitting(true)

              let errorMessage = null

              // Check payout address
              if (
                values.payInPlatform &&
                !validateAddress(values.payoutAddress, values.payoutCurrency)
              ) {
                errorMessage = `Not a valid ${values.payoutCurrency.toUpperCase()} address`
              }

              if (!nameAvailable) {
                errorMessage = 'Name not available'
              }

              if (errorMessage) {
                setStatus({ success: false })
                setErrors({ submit: errorMessage })
              } else {
                setStatus({ success: true })
              }

              setSubmitting(false)
            } catch (err) {
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }) => (
            <div className="card">
              <div className="card-body">
                <Form {...formItemLayout} labelAlign="left">
                  <FormikPatchTouched />
                  <Divider orientation="left">
                    <strong>General</strong>
                  </Divider>
                  {/* <Form.Item name="name" label="Group Name">
                    <Input name="name" placeholder="Enter Group Name" />
                  </Form.Item> */}
                  <Form.Item
                    name="name"
                    label="Group Name"
                    validateStatus={getNameValidateStatus()}
                    help={getNameValidateHelpText()}
                  >
                    <Input
                      name="name"
                      placeholder="Enter Group Name"
                      onBlur={async e => {
                        console.log('searching name')
                        const { exists, error } = await groupExists(e.target.value)
                        console.log(`name: ${exists} ${error}`)
                        setSearchedName(true)
                        setNameAvailable(!exists && !error)
                      }}
                      onError={console.log}
                    />
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
                    name="membershipPeriod"
                    label="Membership Period (Months)"
                    className="mb-3"
                  >
                    <InputNumber
                      name="membershipPeriod"
                      min={1}
                      max={12}
                      defaultValue={1}
                      onChange={e => console.log(e)}
                    />
                  </Form.Item>
                  <Form.Item name="membershipFee" label="Membership Fee" className="mb-3">
                    <Input name="membershipFee" type="number" placeholder="0.00" addonBefore="$" />
                  </Form.Item>
                  <Form.Item name="payInPlatform" label="Pay In Platform">
                    <Checkbox
                      onChange={handleChange}
                      value={values.payInPlatform}
                      name="payInPlatform"
                    />
                  </Form.Item>
                  <Form.Item name="payoutCurrency" label="Payout Currency" className="mb-3">
                    <Select
                      name="payoutCurrency"
                      defaultValue="BTC"
                      style={{ width: 120 }}
                      onChange={handleChange}
                      disabled={!values.payInPlatform}
                    >
                      <Select.Option value="BTC">BTC</Select.Option>
                      <Select.Option value="ETH">ETH</Select.Option>
                      <Select.Option value="LTC">LTC</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="payoutAddress"
                    label="Payout Address"
                    validateStatus={getAddressValidateStatus()}
                    help={getValidateAddressHelpText()}
                  >
                    <Input
                      name="payoutAddress"
                      disabled={!values.payInPlatform}
                      placeholder="e.g. 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                      onBlur={({ target: { value: address } }) => {
                        setIsValidPayoutAddress(validateAddress(address, values.payoutCurrency))
                      }}
                    />
                  </Form.Item>
                  <Divider />
                  <button type="submit" className="btn btn-success px-5">
                    Create Group
                  </button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </ApolloConsumer>
  )
}

export default CreateGroupForm
