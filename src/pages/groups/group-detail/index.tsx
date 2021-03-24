import React, { FC, ReactNode } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Spin } from 'antd'
/* eslint-disable */
import { useGetGroupQuery, useGetMyMembershipQuery } from '../../../graphql/index'
import { GroupDetailHeader } from 'components/nexus/groups/group-detail/GroupDetailHeader'
import { GroupMemberDetailComponent } from 'components/nexus/groups/group-detail/GroupMemberDetailComponent'
import { transformMembershipData } from 'types/membership'
import { transformGroupData } from 'types/group'
import { GroupPublicDetailComponent } from '../../../components/nexus/groups/group-detail/GroupPublicDetailComponent'
/* eslint-enable */

interface GroupDetailProps {
  children?: ReactNode
}

interface RouteParams {
  groupId: string
}

const GroupDetailPage: FC<GroupDetailProps> = () => {
  const { groupId }: RouteParams = useParams()
  const location = useLocation()
  console.log(location)
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

  if (!transformedGroup || getGroupLoading || membershipLoading) {
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
      {getGroupError && <strong>Error loading group {getGroupError.message}</strong>}
      <GroupDetailHeader className="mb-3" group={transformedGroup} />
      {transformedMembership ? (
        <GroupMemberDetailComponent group={transformedGroup} myMembership={transformedMembership} />
      ) : (
        <GroupPublicDetailComponent group={transformedGroup} />
      )}
    </div>
  )
}

export default GroupDetailPage
