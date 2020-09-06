import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

interface GroupDetailProps {
  children?: ReactNode
}

interface RouteParams {
  groupId: string
}

const GroupDetailPage: FC<GroupDetailProps> = () => {
  const { groupId }: RouteParams = useParams()

  // const { data, loading, error } =

  return (
    <div>
      <Helmet title="Groups" />
      <div className="cui__utils__heading">
        <strong>Group Detail {`${groupId}`}</strong>
      </div>
    </div>
  )
}

export default GroupDetailPage
