import React from 'react'

import { GetGroupMembersQuery } from 'graphql'

export interface GroupMembersTableRow {
  id: string
  active: boolean
  username: string
  trades?: number
}

export const createGroupMembersTableData = (
  groupMembersResponse: GetGroupMembersQuery | undefined,
): GroupMembersTableRow[] => {
  if (!groupMembersResponse?.group?.members) {
    return []
  }

  const { members } = groupMembersResponse.group.members
  return members.map(
    (membership): GroupMembersTableRow => ({
      id: membership.id,
      active: membership.active,
      trades: membership.orders.totalCount,
      username: membership.member.username,
    }),
  )
}

export const badgeForIsActiveMember = (active: boolean) => {
  return (
    <span
      className={active ? 'font-size-12 badge badge-primary' : 'font-size-12 badge badge-default'}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}
