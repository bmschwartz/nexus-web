import React from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
// import {useGetMyOrdersQuery} from '../../graphql'
/* eslint-enable */

const MemberOrders = () => {
  // const { data, loading } = useGetMyOrdersQuery({ fetchPolicy: 'cache-and-network' })

  if (apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/home" />
  }

  return <div>My Orders</div>
}

export default MemberOrders
