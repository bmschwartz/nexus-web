import React from 'react'
import { PageHeader, Spin } from 'antd'
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
      <div className="card-header card-header-flex mb-3">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Profile" backIcon={false} />
        </div>
      </div>
      <GroupEditProfile group={group} />
    </div>
  )
}

export default Profile
