import React from 'react'
import { Spin } from 'antd'
import { Helmet } from 'react-helmet'
import * as apollo from 'services/apollo'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import { useGetMyGroupQuery } from '../../graphql'
import { transformGroups } from '../../types/group'
import { GroupEditProfile } from '../../components/nexus/groups/group-detail/GroupEditProfile'
/* eslint-enable */

const Profile = () => {
  const { data, loading } = useGetMyGroupQuery({ fetchPolicy: 'cache-and-network' })

  if (loading || !data?.myGroup) {
    return <Spin />
  }

  const group = transformGroups([data.myGroup])[0]

  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/home" />
  }

  return (
    <div>
      <Helmet title="Profile" />
      <h3>Profile</h3>
      <GroupEditProfile group={group} />
    </div>
  )
}

export default Profile
