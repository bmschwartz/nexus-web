import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupDetailCardProps {
  group: Group
}

export const GroupDetailCard: FC<GroupDetailCardProps> = ({ group }) => {
  return <strong>{group.name}</strong>
}
