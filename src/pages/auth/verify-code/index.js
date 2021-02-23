import React from 'react'
import { Helmet } from 'react-helmet'
import VerifyCode from 'components/cleanui/system/Auth/VerifyCode'

const SystemVerifyCode = () => {
  return (
    <div>
      <Helmet title="Verify Code" />
      <VerifyCode />
    </div>
  )
}

export default SystemVerifyCode
