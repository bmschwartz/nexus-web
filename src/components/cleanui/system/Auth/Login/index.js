import React, { useState } from 'react'
import { connect } from 'react-redux'
import { notification } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import { SubmitButton, Input, Form } from 'formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import YupPass from 'yup-password'

import style from '../style.module.scss'
/* eslint-disable */
import * as apollo from '../../../../../services/apollo'
/* eslint-enable */

YupPass(Yup)

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  logo: settings.logo,
})

const getLoginFormSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Not a valid email')
      .required(),
    password: Yup.string()
      .label('Password')
      .password()
      .minSymbols(0)
      .required(),
  })
}

const Login = ({ logo }) => {
  const [redirect, setRedirect] = useState(false)
  const [submittingLogin, setSubmittingLogin] = useState(false)

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="mb-5 px-3">
          <strong>Welcome to {logo}</strong>
        </h1>
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Sign in to your account</strong>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={getLoginFormSchema}
          onSubmit={async values => {
            const { email, password } = values
            setSubmittingLogin(true)

            const { success } = await apollo.login({ email, password })
            if (success) {
              notification.success({
                duration: 1.5,
                message: 'Login Success!',
                onClose: () => setRedirect(true),
              })
            } else {
              notification.error({
                message: 'Login Error',
                description: 'Incorrect username or password combination',
                duration: 3, // seconds
              })
            }

            setSubmittingLogin(false)
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
                    prefix={<MailOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item name="password" className="mb-4">
                  <Input.Password size="large" name="password" placeholder="Enter Password" />
                </Form.Item>
                <SubmitButton loading={submittingLogin} size="large" block>
                  Submit
                </SubmitButton>
              </Form>
            </div>
          )}
        </Formik>
        <Link to="/forgot-password" className="kit__utils__link font-size-16">
          Forgot Password?
        </Link>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Don&#39;t have an account?</span>
        <Link to="/register" className="kit__utils__link font-size-16">
          Sign up
        </Link>
      </div>
      {redirect && (
        <Redirect
          to={{
            pathname: '/groups',
          }}
        />
      )}
    </div>
  )
}

export default connect(mapStateToProps)(Login)
