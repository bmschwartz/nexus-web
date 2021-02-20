import React, { FC, ReactNode } from 'react'
import GroupTable from 'components/nexus/groups/group-table/GroupTable'
import { Helmet } from 'react-helmet'

import { Group } from 'types/group'
import {
  convertToLocalMembershipRole,
  convertToLocalMembershipStatus,
  Membership,
  MembershipRole,
  MembershipStatus,
} from 'types/membership'

/* eslint-disable */
import { useGetAllGroupsQuery, useMyMembershipsQuery } from '../../../graphql/index'
import { transformBills } from '../group-detail'
/* eslint-enable */

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
    return memberships.map(membership => {
      const { subscription } = membership
      if (subscription) {
        subscription.bills = transformBills(subscription.bills)
      }

      return {
        id: membership.id,
        groupId: membership.group.id,
        active: membership.active,
        memberId: membership.member.id,
        username: membership.member.username,
        role: convertToLocalMembershipRole(membership.role) as MembershipRole,
        status: convertToLocalMembershipStatus(membership.status) as MembershipStatus,
        orders: membership.orders,
        subscription,
        exchangeAccounts: membership.exchangeAccounts,
      }
    })
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
