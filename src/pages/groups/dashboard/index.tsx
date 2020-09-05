import React, { FC, ReactNode } from 'react'
import GroupTable from 'components/nexus/groups/GroupTable'
import { Helmet } from 'react-helmet'
import { Group } from 'types/group'
// eslint-disable-next-line
import { useGetAllGroupsQuery, useMyMembershipsQuery } from '../../../graphql/index'
// import { Membership } from 'types/membership'

interface GroupsDashboardProps {
  children?: ReactNode
}
const GroupsDashboard: FC<GroupsDashboardProps> = () => {
  const { data: allGroupsData } = useGetAllGroupsQuery()
  const { data: membershipData } = useMyMembershipsQuery()

  console.log(membershipData?.myMemberships)
  // const transformMemberships = (memberships: any[]): Membership[] => {
  //   const transformed: Membership[] = memberships.map(membership => ({
  //     group: membership.group,
  //   }))
  //   return transformed
  // }
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
      {allGroupsData && <GroupTable groups={transformGroups(allGroupsData.allGroups)} />}
    </div>
  )
}

export default GroupsDashboard
