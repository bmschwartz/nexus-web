import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import Login from 'components/cleanui/system/Auth/Login'

const SystemLogin: FC = () => {
  return (
    <div>
      <Helmet title="Login" />
      <Login />
    </div>
  )
}

export default SystemLogin
