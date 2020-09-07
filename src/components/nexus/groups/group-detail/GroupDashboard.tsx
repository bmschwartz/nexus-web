import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupDashboardProps {
  group: Group
}

export const GroupDashboard: FC<GroupDashboardProps> = ({ group }) => {
  return <p>Dashboard for {group.name}</p>
}
