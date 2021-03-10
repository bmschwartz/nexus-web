import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
import { useGetMyGroupQuery } from '../../graphql'
import { Spin } from 'antd'
import { transformGroups } from '../../types/group'
import {
  GroupMembers,
  GroupMembersTabState,
} from '../../components/nexus/groups/group-detail/GroupMembers'
/* eslint-enable */

const Members = () => {
  const { data, loading } = useGetMyGroupQuery({ fetchPolicy: 'cache-and-network' })
  const [groupMembersTabState, setGroupMembersTabState] = useState<GroupMembersTabState>(
    GroupMembersTabState.VIEW_ALL,
  )

  if (loading || !data?.myGroup) {
    return <Spin />
  }

  const group = transformGroups([data.myGroup])[0]

  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/home" />
  }

  return (
    <div>
      <GroupMembers
        group={group}
        tabState={groupMembersTabState}
        setTabState={setGroupMembersTabState}
      />
    </div>
  )
}

export default Members
