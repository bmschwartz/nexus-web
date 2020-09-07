import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupSettingsProps {
  group: Group
}

export const GroupSettings: FC<GroupSettingsProps> = ({ group }) => {
  return <p>Settings for {group.name}</p>
}
