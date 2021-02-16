import React, { FC, ReactNode } from 'react'
import GroupTable from 'components/nexus/groups/group-table/GroupTable'
import { Helmet } from 'react-helmet'

import { Group } from 'types/group'
import { convertToLocalPaymentStatus, Membership } from 'types/membership'
// eslint-disable-next-line
import { useGetAllGroupsQuery, useMyMembershipsQuery } from '../../../graphql/index'

interface GroupsDashboardProps {
  children?: ReactNode
}
const GroupsDashboard: FC<GroupsDashboardProps> = () => {
  const { data: allGroupsData } = useGetAllGroupsQuery({ fetchPolicy: 'cache-and-network' })
  const { data: membershipData } = useMyMembershipsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { roles: null, statuses: null } },
  })

  const transformMemberships = (memberships: any[]): Membership[] => {
    return memberships.map(membership => ({
      id: membership.id,
      groupId: membership.group.id,
      active: membership.active,
      memberId: membership.member.id,
      username: membership.member.username,
      role: membership.role,
      status: membership.status,
      orders: membership.orders,
      subscription: {
        ...membership.subscription,
        paymentStatus: convertToLocalPaymentStatus(membership.subscription.paymentStatus),
      },
      exchangeAccounts: membership.exchangeAccounts,
    }))
  }
  const transformGroups = (groups: any[]): Group[] => {
    return groups.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description,
      active: group.active,
      memberships: [],
    }))
  }
  return (
    <div>
      <Helmet title="Groups" />
      {allGroupsData?.allGroups && membershipData?.myMemberships && (
        <GroupTable
          groups={transformGroups(allGroupsData.allGroups)}
          memberships={transformMemberships(membershipData.myMemberships)}
        />
      )}
    </div>
  )
}

export default GroupsDashboard
