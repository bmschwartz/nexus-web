import React from 'react'
import { Spin } from 'antd'

/* eslint-disable */
import { MembershipRole, MembershipStatus, useMyMembershipsQuery } from '../../graphql'
import { transformMemberships } from '../../types/membership'
import CreateGroupForm from '../../components/nexus/groups/create-group/CreateGroupForm'
import GroupHome from './GroupHome'
/* eslint-enable */

export const GroupOwnerTraderHome = () => {
  const { data, loading, error } = useMyMembershipsQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        roles: [MembershipRole.Admin, MembershipRole.Trader],
        statuses: [MembershipStatus.Approved],
      },
    },
  })

  if (loading || error || !data?.myMemberships) {
    return <Spin />
  }

  const memberships = transformMemberships(data?.myMemberships)
  const groupId = memberships.length > 0 ? memberships[0].groupId : ''

  return memberships.length === 0 ? <CreateGroupForm /> : <GroupHome groupId={groupId} />
}
