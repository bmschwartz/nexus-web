import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Spin } from 'antd'
import { Group } from 'types/group'
/* eslint-disable */
import { useGetGroupQuery, useGetMembershipQuery } from '../../../graphql/index'
import { GroupDetailHeader } from 'components/nexus/groups/GroupDetailHeader'
import { GroupDetailCard } from 'components/nexus/groups/GroupDetailCard'
import { Membership, roleFromString, statusFromString } from 'types/membership'
/* eslint-enable */

interface GroupDetailProps {
  children?: ReactNode
}

interface RouteParams {
  groupId: string
}

const GroupDetailPage: FC<GroupDetailProps> = () => {
  const { groupId }: RouteParams = useParams()
  const { data: getGroupData, loading: getGroupLoading, error: getGroupError } = useGetGroupQuery({
    variables: { input: { groupId } },
  })
  const { data: membershipData, loading: membershipLoading } = useGetMembershipQuery({
    variables: { input: { groupId } },
  })

  const transformGroupData = (group: any): Group => {
    return {
      id: group.id,
      name: group.name,
      active: group.active,
      description: group.description,
      memberships: [],
    }
  }

  const transformMembershipData = (membership: any): Membership => {
    console.log(membership)
    return {
      id: membership.id,
      groupId: membership.group.id,
      memberId: membership.member.id,
      active: membership.active,
      orders: [],
      role: roleFromString(membership.role)!,
      status: statusFromString(membership.status)!,
    }
  }

  return (
    <div>
      <Helmet title="Groups" />
      {(getGroupLoading || membershipLoading) && <Spin />}
      {getGroupError && <strong>No access to group {getGroupError.message}</strong>}
      {getGroupData && membershipData && getGroupData.group && membershipData?.membership ? (
        <>
          <GroupDetailHeader className="mb-3" group={transformGroupData(getGroupData.group)} />
          <GroupDetailCard
            group={transformGroupData(getGroupData.group)}
            membership={transformMembershipData(membershipData.membership)}
          />
        </>
      ) : (
        <strong>No access to group</strong>
      )}
    </div>
  )
}

export default GroupDetailPage
