import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupDetailHeaderProps {
  group: Group
}

export const GroupDetailHeader: FC<GroupDetailHeaderProps> = ({ group }) => {
  return <strong>{group.name}</strong>
}
