import React, { FC, ReactNode } from 'react'
import GroupTable from 'components/nexus/groups/group-table/GroupTable'
import { Helmet } from 'react-helmet'

import { Group } from 'types/group'
import { Membership } from 'types/membership'
// eslint-disable-next-line
import { useGetAllGroupsQuery, useMyMembershipsQuery } from '../../../graphql/index'

interface GroupsDashboardProps {
  children?: ReactNode
}
const GroupsDashboard: FC<GroupsDashboardProps> = () => {
  const { data: allGroupsData } = useGetAllGroupsQuery()
  const { data: membershipData } = useMyMembershipsQuery({
    variables: { input: { roles: null, statuses: null } },
  })

  const transformMemberships = (memberships: any[]): Membership[] => {
    const transformed: Membership[] = memberships.map(membership => ({
      id: membership.id,
      groupId: membership.group.id,
      active: membership.active,
      memberId: membership.member.id,
      username: membership.member.username,
      role: membership.role,
      status: membership.status,
      orders: membership.orders,
    }))
    return transformed
  }
  const transformGroups = (groups: any[]): Group[] => {
    const transformed: Group[] = groups.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description,
      active: group.active,
      memberships: [],
    }))
    return transformed
  }
  return (
    <div>
      <Helmet title="Groups" />
      <div className="cui__utils__heading">
        <strong>Groups</strong>
      </div>
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
