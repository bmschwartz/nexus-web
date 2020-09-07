import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupMembersProps {
  group: Group
}

export const GroupMembers: FC<GroupMembersProps> = ({ group }) => {
  return <p>Members for {group.name}</p>
}
