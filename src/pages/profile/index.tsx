import React from 'react'
import { Helmet } from 'react-helmet'
import * as apollo from 'services/apollo'
import { Redirect } from 'react-router-dom'

const Profile = () => {
  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <Helmet title="Profile" />
      <h3>Profile</h3>
    </div>
  )
}

export default Profile
