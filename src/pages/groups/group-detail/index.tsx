import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Spin } from 'antd'
import { Group } from 'types/group'
/* eslint-disable */
import { useGetGroupQuery, useGetMembershipQuery } from '../../../graphql/index'
import { GroupDetailHeader } from 'components/nexus/groups/group-detail/GroupDetailHeader'
import { GroupDetailCard } from 'components/nexus/groups/group-detail/GroupDetailCard'
import { Membership, roleFromString, statusFromString } from 'types/membership'
import { Order } from 'types/order'
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
    fetchPolicy: 'network-only',
    variables: { input: { groupId } },
  })
  const { data: membershipData, loading: membershipLoading } = useGetMembershipQuery({
    fetchPolicy: 'network-only',
    variables: { input: { groupId } },
  })

  const transformGroupData = (group: any): Group => {
    return {
      id: group.id,
      name: group.name,
      active: group.active,
      description: group.description,
      memberships: group.memberships.map(transformMembershipData),
    }
  }

  const transformMembershipData = (membership: any): Membership => ({
    id: membership.id,
    groupId: membership.group.id,
    memberId: membership.member.id,
    username: membership.member.username,
    active: membership.active,
    orders: membership.orders.map(transformOrderData),
    role: roleFromString(membership.role)!,
    status: statusFromString(membership.status)!,
  })

  const transformOrderData = (order: any): Order => ({
    id: order.id,
    side: order.side,
    orderType: order.orderType,
    price: order.price,
    quantity: order.quantity,
    stopPrice: order.stopPrice,
    symbol: order.symbol,
    lastTimestamp: order.lastTimeStamp,
  })

  let transformedGroup
  let transformedMembership

  if (getGroupData && getGroupData.group) {
    transformedGroup = transformGroupData(getGroupData.group)
  }
  if (membershipData?.membership) {
    transformedMembership = transformMembershipData(membershipData.membership)
  }

  return (
    <div>
      <Helmet title="Groups" />
      {(getGroupLoading || membershipLoading) && <Spin />}
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
