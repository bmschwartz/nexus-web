import React, { FC, ReactNode } from 'react'
import GroupTable from 'components/nexus/groups/group-table/GroupTable'
import { Helmet } from 'react-helmet'

import { transformGroups } from 'types/group'
import { transformMemberships } from 'types/membership'

/* eslint-disable */
import * as apollo from 'services/apollo'
import { useGetAllGroupsQuery, useMyMembershipsQuery } from '../../../graphql/index'
import { Redirect } from 'react-router-dom'
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

  if (!apollo.isGroupMemberUserType()) {
    return <Redirect to="/home" />
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
