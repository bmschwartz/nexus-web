import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupProfileProps {
  group: Group
}

export const GroupProfile: FC<GroupProfileProps> = ({ group }) => {
  return <p>Profile for {group.name}</p>
}
