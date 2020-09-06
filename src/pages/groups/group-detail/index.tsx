import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Spin } from 'antd'
import { Group } from 'types/group'
/* eslint-disable */
import { useGetGroupQuery } from '../../../graphql/index'
import { GroupDetailHeader } from 'components/nexus/groups/GroupDetailHeader'
import { GroupDetailCard } from 'components/nexus/groups/GroupDetailCard'
/* eslint-enable */

interface GroupDetailProps {
  children?: ReactNode
}

interface RouteParams {
  groupId: string
}

const GroupDetailPage: FC<GroupDetailProps> = () => {
  const { groupId }: RouteParams = useParams()
  const { data, loading, error } = useGetGroupQuery({ variables: { input: { groupId } } })

  const transformGroupData = (group: any): Group => {
    return {
      id: group.id,
      name: group.name,
      active: group.active,
      description: group.description,
      memberships: [],
    }
  }

  return (
    <div>
      <Helmet title="Groups" />
      {loading && <Spin />}
      {error && <strong>Error loading group {error.message}</strong>}
      {data && data.group ? (
        <>
          <GroupDetailHeader group={transformGroupData(data.group)} />
          <GroupDetailCard group={transformGroupData(data.group)} />
        </>
      ) : (
        <strong>Error loading group</strong>
      )}
    </div>
  )
}

export default GroupDetailPage
