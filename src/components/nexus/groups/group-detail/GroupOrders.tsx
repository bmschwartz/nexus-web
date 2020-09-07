import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupOrdersProps {
  group: Group
}

export const GroupOrders: FC<GroupOrdersProps> = ({ group }) => {
  return <p>Orders for {group.name}</p>
}
