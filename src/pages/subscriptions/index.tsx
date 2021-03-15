import React from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
import { SubscriptionTable } from '../../components/nexus/subscription/SubscriptionTable'
import { useGetMyGroupQuery } from '../../graphql'
import { Spin } from 'antd'
import { transformGroups } from '../../types/group'
/* eslint-enable */

const Subscriptions = () => {
  const { data, loading } = useGetMyGroupQuery({ fetchPolicy: 'cache-and-network' })
  if (loading || !data) {
    return <Spin />
  }

  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/home" />
  }

  const group = transformGroups([data.myGroup])[0]

  return (
    <div>
      <SubscriptionTable subscriptionOptions={group.subscriptionOptions} />
    </div>
  )
}

export default Subscriptions
