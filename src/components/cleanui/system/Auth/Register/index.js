import { notification } from 'antd'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Amplify, { Auth as AmplifyAuth } from 'aws-amplify'
import * as Yup from 'yup'
import YupPass from 'yup-password'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { UserOutlined } from '@ant-design/icons'
import style from '../style.module.scss'
import awsExports from '../../../../../aws-exports'

Amplify.configure(awsExports)

// Add password validation to Yup
YupPass(Yup)

const getRegisterFormSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email()
      .required(),
    password: Yup.string()
      .label('Password')
      .password()
      .required(),
    confirmPassword: Yup.string()
      .label('Confirm Password')
      .password()
      .oneOf([Yup.ref('password'), null], "Passwords don't match!")
      .required(),
  })
}

const Register = () => {
  const [email, setEmail] = useState('')
  const [submittingRegistration, setSubmittingRegistration] = useState(false)
  const [redirectToVerifyToken, setRedirectToVerifyToken] = useState(false)

  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Create your account</strong>
        </div>
        <Formik
          initialValues={{
            email,
          }}
          validationSchema={getRegisterFormSchema}
          onSubmit={async values => {
            setSubmittingRegistration(true)
            const { password } = values
            try {
              console.log('signup!')
              const res = await AmplifyAuth.signUp({
                username: email,
                password,
                attributes: {
                  email,
                },
              })
              console.log(res)
              notification.success({
                duration: 1,
                message: 'Registration Success',
                description: 'You have successfully registered!',
                onClose: () => setRedirectToVerifyToken(true),
              })
              // do not set submittingRegistration to false because we don't want the user to do anything
            } catch (e) {
              console.log('error', e)
              notification.error({
                message: 'Registration Error',
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
                    prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="password" className="mb-4">
                  <Input.Password size="large" name="password" placeholder="Enter Password" />
                </Form.Item>
                <Form.Item name="confirmPassword" className="mb-4">
                  <Input.Password
                    size="large"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
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
