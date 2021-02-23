import React, { useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { SubmitButton, Form, Input } from 'formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import auth from 'services/amplify/auth'
import style from '../style.module.scss'

const getValidateCodeFormSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Not a valid email')
      .required(),
    verificationCode: Yup.string()
      .label('Verify Code')
      .required('Code is Required'),
  })
}

const VerifyCode = () => {
  const [submittingCode, setSubmittingCode] = useState<boolean>(false)
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false)
  const searchParams = new URLSearchParams(useLocation().search)

  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-dark text-center font-size-24 mb-4">
          <strong>Verify Code</strong>
        </div>
        <div className="text-center">You should receive a registration code by email shortly</div>
        <Formik
          initialValues={{
            email: searchParams.get('email') ?? '',
            verificationCode: '',
          }}
          validationSchema={getValidateCodeFormSchema}
          onSubmit={async values => {
            const { email, verificationCode } = values
            setSubmittingCode(true)

            const { success, error } = await auth.verifyRegistrationCode(email, verificationCode)
            if (success) {
              notification.success({
                duration: 1,
                message: 'Successfully Confirmed!',
                description: 'You will be redirected to login',
                onClose: () => setRedirectToLogin(true),
              })
            } else {
              console.error(error)
              notification.error({
                message: 'Invalid Code!',
                description: 'That registration code is invalid',
                duration: 3, // seconds
              })
            }

            setSubmittingCode(false)
          }}
        >
          {() => (
            <div className="card-body">
              <Form layout="vertical" className="mb-4">
                <Form.Item name="email" className="mb-4">
                  <Input
                    size="large"
                    name="email"
                    placeholder="Enter Email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="verificationCode" className="mb-4">
                  <Input size="large" name="verificationCode" placeholder="Enter Code" />
                </Form.Item>
                <SubmitButton loading={submittingCode} size="large" block>
                  Submit
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
      {redirectToLogin && (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )}
    </div>
  )
}

export default VerifyCode
