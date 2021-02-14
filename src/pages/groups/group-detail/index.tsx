import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Spin } from 'antd'
import { Group } from 'types/group'
/* eslint-disable */
import { useGetGroupQuery, useGetMyMembershipQuery } from '../../../graphql/index'
import { GroupDetailHeader } from 'components/nexus/groups/group-detail/GroupDetailHeader'
import { GroupDetailCard } from 'components/nexus/groups/group-detail/GroupDetailCard'
import {
  convertToLocalMembershipRole,
  convertToLocalMembershipStatus,
  Membership,
} from 'types/membership'
import { ExchangeAccount } from 'types/exchange'
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
    fetchPolicy: 'cache-and-network',
    variables: { input: { groupId } },
  })
  const { data: membershipData, loading: membershipLoading } = useGetMyMembershipQuery({
    fetchPolicy: 'cache-and-network',
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

  const transformMembershipData = (membership: any): Membership => ({
    id: membership.id,
    groupId: membership.group.id,
    memberId: membership.member.id,
    username: membership.member.username,
    active: membership.active,
    role: convertToLocalMembershipRole(membership.role)!,
    exchangeAccounts: membership.exchangeAccounts.map(transformExchangeAccount),
    status: convertToLocalMembershipStatus(membership.status)!,
  })

  const transformExchangeAccount = (exchangeAccount: any): ExchangeAccount => {
    const { id, active, createdAt, exchange, orders } = exchangeAccount

    return {
      id,
      active,
      createdAt,
      exchange,
      orderCount: orders?.totalCount,
    }
  }

  let transformedGroup
  let transformedMembership

  if (getGroupData && getGroupData.group) {
    transformedGroup = transformGroupData(getGroupData.group)
  }
  if (membershipData?.myMembership) {
    transformedMembership = transformMembershipData(membershipData.myMembership)
  }

  if (getGroupLoading || membershipLoading) {
    return (
      <div>
        <Helmet title="Groups" />
        <Spin />
      </div>
    )
  }

  return (
    <div>
      <Helmet title="Groups" />
      {getGroupError && <strong>No access to group {getGroupError.message}</strong>}
      {transformedGroup && transformedMembership ? (
        <>
          <GroupDetailHeader className="mb-3" group={transformedGroup} />
          <GroupDetailCard group={transformedGroup} myMembership={transformedMembership} />
        </>
      ) : (
        <strong>No access to group</strong>
      )}
    </div>
  )
}

export default GroupDetailPage
