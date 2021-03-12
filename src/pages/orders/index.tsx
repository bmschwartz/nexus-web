import React from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
import GroupOrders from './GroupOrders'
/* eslint-enable */

const Orders = () => {
  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/home" />
  }

  return <GroupOrders />
}

export default Orders
