import React from 'react'

/* eslint-disable */
import { useGetGroupQuery } from '../../graphql'
/* eslint-enable */

interface GroupHomeProps {
  groupId: string
}

const GroupHome = ({ groupId }: GroupHomeProps) => {
  const { data: groupData } = useGetGroupQuery({
    variables: { input: { groupId } },
  })

  if (!groupData?.group) {
    return null
  }

  return (
    <div>
      <h3>{groupData.group.name}</h3>
    </div>
  )
}

export default GroupHome
