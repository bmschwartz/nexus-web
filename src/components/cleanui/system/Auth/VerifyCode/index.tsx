import React from 'react'
// import {notification} from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { SubmitButton, Form, Input } from 'formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import style from '../style.module.scss'

const getRegisterFormSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .required(),
    verificationCode: Yup.string()
      .label('Verify Code')
      .required('Code is Required'),
  })
}

const VerifyCode = () => {
  // const [verificationCode, setVerificationCode] = useState
  const searchParams = new URLSearchParams(useLocation().search)
  const email = searchParams.get('email')
  console.log(email)

  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-dark text-center font-size-24 mb-4">
          <strong>Verify Code</strong>
        </div>
        <div className="text-center">You should receive a registration code by email shortly</div>
        <Formik
          initialValues={{
            verificationCode: '',
          }}
          validationSchema={getRegisterFormSchema}
          onSubmit={async values => {
            console.log(values)
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
                  <Input
                    size="large"
                    name="verificationCode"
                    placeholder="Enter Code"
                    // onChange={(e) => {
                    //   handleChange(e)
                    //   setEmail(e.target.value)
                    // }}
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <SubmitButton
                  // loading={submittingRegistration}
                  size="large"
                  block
                >
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
    </div>
  )
}

export default VerifyCode
