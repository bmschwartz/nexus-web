import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupPositionsProps {
  group: Group
}

export const GroupPositions: FC<GroupPositionsProps> = ({ group }) => {
  return <p>Positions for {group.name}</p>
}
