import React, { FC } from 'react'
import * as Yup from 'yup'

import { Exchange } from 'types/exchange'
import { Membership } from 'types/membership'
import { PageHeader } from 'antd'
import { Formik } from 'formik'

/* eslint-disable */
/* eslint-enable */

interface CreateExchangeAccountFormProps {
  membership: Membership
  onClickBack: () => void
  onCreated: () => void
}

const EXCHANGES = [Exchange.BINANCE, Exchange.BITMEX]

const getCreateExchangeAccountSchema = () => {
  return Yup.object().shape({
    exchange: Yup.string()
      .label('Exchange')
      .oneOf(EXCHANGES)
      .required(),
    apiKey: Yup.string()
      .label('API Key')
      .required(),
    apiSecret: Yup.string()
      .label('API Secret')
      .required(),
  })
}

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 4 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 12 },
//   },
// }

export const CreateExchangeAccountForm: FC<CreateExchangeAccountFormProps> = ({ onClickBack }) => {
  const CreateExchangeAccountSchema = getCreateExchangeAccountSchema()

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Create Order Set" onBack={onClickBack} />
        </div>
      </div>
      <Formik
        initialValues={{
          exchange: EXCHANGES[0],
          apiKey: '',
          apiSecret: '',
        }}
        validationSchema={CreateExchangeAccountSchema}
        onSubmit={async values => {
          console.log(values)
        }}
      >
        {() => <div>Hey!</div>}
      </Formik>
    </>
  )
}
