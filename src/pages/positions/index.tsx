import { Spin } from 'antd'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
import {
  GroupPositions,
  GroupPositionsTabState,
} from '../../components/nexus/groups/group-detail/GroupPositions'
import { useGetMyGroupQuery } from '../../graphql'
import { transformGroups } from '../../types/group'
/* eslint-enable */

const Positions = () => {
  const { data, loading } = useGetMyGroupQuery({ fetchPolicy: 'cache-and-network' })
  const [groupPositionsTabState, setGroupPositionsTabState] = useState<GroupPositionsTabState>(
    GroupPositionsTabState.VIEW_ALL,
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
      <GroupPositions
        group={group}
        tabState={groupPositionsTabState}
        setTabState={setGroupPositionsTabState}
      />
    </div>
  )
}

export default Positions
