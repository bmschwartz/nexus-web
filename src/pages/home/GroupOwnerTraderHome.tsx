import React from 'react'
import { Spin } from 'antd'

/* eslint-disable */
import { useGetMyGroupQuery } from '../../graphql'
import CreateGroupForm from '../../components/nexus/groups/create-group/CreateGroupForm'
import GroupHome from './GroupHome'
import { transformGroups } from '../../types/group'
/* eslint-enable */

export const GroupOwnerTraderHome = () => {
  const { data, loading } = useGetMyGroupQuery({ fetchPolicy: 'cache-and-network' })
  if (loading || !data) {
    return <Spin />
  }

  if (!data.myGroup) {
    return <CreateGroupForm />
  }

  const group = transformGroups([data.myGroup])[0]

  return group ? <GroupHome group={group} /> : <CreateGroupForm />
}
