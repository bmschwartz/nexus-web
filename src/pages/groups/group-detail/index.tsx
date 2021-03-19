import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Spin } from 'antd'
/* eslint-disable */
import {
  SubscriptionInvoice as RemoteSubscriptionInvoice,
  useGetGroupQuery,
  useGetMyMembershipQuery,
} from '../../../graphql/index'
import { GroupDetailHeader } from 'components/nexus/groups/group-detail/GroupDetailHeader'
import { GroupDetailCard } from 'components/nexus/groups/group-detail/GroupDetailCard'
import { convertToLocalInvoiceStatus, transformMembershipData } from 'types/membership'
import { transformGroupData } from 'types/group'
import { SubscriptionInvoice } from 'types/subscription'
/* eslint-enable */

interface GroupDetailProps {
  children?: ReactNode
}

interface RouteParams {
  groupId: string
}

export const transformInvoices = (invoices: RemoteSubscriptionInvoice[]): SubscriptionInvoice[] => {
  return invoices.map((invoice: RemoteSubscriptionInvoice) => {
    const { status, ...rest } = invoice
    return {
      status: convertToLocalInvoiceStatus(status),
      ...rest,
    }
  })
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
