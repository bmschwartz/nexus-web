import React from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
/* eslint-enable */

const Subscriptions = () => {
  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/home" />
  }

  return (
    <div>
      <h3>Subscriptions</h3>
    </div>
  )
}

export default Subscriptions
