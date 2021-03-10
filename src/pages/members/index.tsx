import React from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
/* eslint-enable */

const Members = () => {
  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h3>Members</h3>
    </div>
  )
}

export default Members
