import { notification } from 'antd'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import YupPass from 'yup-password'
import { Formik } from 'formik'
import { Form, Input, SubmitButton, Select } from 'formik-antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'

import style from '../style.module.scss'
/* eslint-disable */
import * as apollo from '../../../../../services/apollo'
/* eslint-enable */

// Add password validation to Yup
YupPass(Yup)

const getRegisterFormSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email()
      .required(),
    username: Yup.string()
      .label('Username')
      .required(),
    password: Yup.string()
      .label('Password')
      .password()
      .minSymbols(0)
      .required(),
    userType: Yup.string()
      .label('Role')
      .required('User role is required'),
  })
}

const Register = () => {
  const [email, setEmail] = useState('')
  const [redirectToVerifyToken, setRedirectToVerifyToken] = useState(false)
  const [submittingRegistration, setSubmittingRegistration] = useState(false)

  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Create your account</strong>
        </div>
        <Formik
          initialValues={{
            email,
            username: '',
          }}
          validationSchema={getRegisterFormSchema}
          onSubmit={async values => {
            setSubmittingRegistration(true)
            const { username, password, userType } = values

            const { success, error } = await apollo.register({
              email,
              username,
              password,
              userType,
            })
            if (success) {
              notification.success({
                duration: 1,
                message: 'Registration Success',
                description: 'You have successfully registered!',
                onClose: () => setRedirectToVerifyToken(true),
              })
              // do not set submittingRegistration to false because we don't want the user to do anything
            } else {
              notification.error({
                message: 'Registration Error',
                description: error,
                duration: 3, // seconds
              })
              setSubmittingRegistration(false)
            }
          }}
        >
          {({ handleChange }) => (
            <div className="card-body">
              <Form layout="vertical" className="mb-4">
                <Form.Item name="email" className="mb-4">
                  <Input
                    size="large"
                    name="email"
                    placeholder="Enter Email"
                    onChange={e => {
                      handleChange(e)
                      setEmail(e.target.value)
                    }}
                    prefix={<MailOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="username" className="mb-4">
                  <Input
                    size="large"
                    name="username"
                    placeholder="Enter Username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="password" className="mb-4">
                  <Input.Password size="large" name="password" placeholder="Enter Password" />
                </Form.Item>
                <Form.Item name="userType" className="mb-5">
                  <Select
                    name="userType"
                    size="large"
                    placeholder="Select the role that best describes you"
                  >
                    <Select.Option value="MEMBER">Group Member</Select.Option>
                    <Select.Option value="OWNER">Group Owner</Select.Option>
                  </Select>
                </Form.Item>
                <SubmitButton loading={submittingRegistration} size="large" block="block">
                  Sign Up
                </SubmitButton>
              </Form>
            </div>
          )}
        </Formik>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Already have an account?</span>
        <Link to="/login" className="kit__utils__link font-size-16">
          Sign in
        </Link>
      </div>
      {redirectToVerifyToken && (
        <Redirect
          to={{
            pathname: '/verify',
            search: `?email=${email}`,
          }}
        />
      )}
    </div>
  )
}

export default Register
