import { Spin } from 'antd'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
import { useGetMyGroupQuery } from '../../graphql'
import { transformGroups } from '../../types/group'
import {
  GroupOrderSets,
  OrderSetTabState,
} from '../../components/nexus/groups/group-detail/GroupOrderSet'
/* eslint-enable */

const Orders = () => {
  const { data, loading } = useGetMyGroupQuery({ fetchPolicy: 'cache-and-network' })
  const [groupOrdersTabState, setGroupOrdersTabState] = useState<OrderSetTabState>(
    OrderSetTabState.VIEW_ALL,
  )

  if (loading || !data?.myGroup) {
    return <Spin />
  }

  const group = transformGroups([data.myGroup])[0]

  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <GroupOrderSets
        group={group}
        tabState={groupOrdersTabState}
        setTabState={setGroupOrdersTabState}
      />
    </div>
  )
}

export default Orders
