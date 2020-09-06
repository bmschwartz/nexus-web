import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupDetailHeaderProps {
  className?: string
  group: Group
}

export const GroupDetailHeader: FC<GroupDetailHeaderProps> = ({ className, group }) => {
  return (
    <div className={className}>
      <strong>{group.name}</strong>
    </div>
  )
}
