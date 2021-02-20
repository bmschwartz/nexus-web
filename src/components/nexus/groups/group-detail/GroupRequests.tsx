import React, { FC } from 'react'
import { Group } from 'types/group'

/* eslint-disable */
import { GroupRequestsTable } from '../../group-members/GroupRequestsTable'
/* eslint-enable */

interface GroupRequestsProps {
  group: Group
}

export const GroupRequests: FC<GroupRequestsProps> = ({ group }) => {
  return <GroupRequestsTable groupId={group.id} />
}
