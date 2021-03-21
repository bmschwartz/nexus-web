import React from 'react'
import * as _ from 'lodash'
import { Tooltip } from 'antd'
import { Group } from 'types/group'
import { Membership, MembershipRole, MembershipStatus } from 'types/membership'

export interface GroupTableItem {
  id: string
  name: string
  active: boolean
  isMember?: boolean
  activeMembership?: boolean
  memberRole?: MembershipRole
  memberStatus?: MembershipStatus
  description: string
}

export const createGroupTableData = (
  groups: Group[],
  memberships: Membership[],
): GroupTableItem[] => {
  let groupMembershipMap = {}

  _.forEach(memberships, membership => {
    groupMembershipMap = Object.assign(groupMembershipMap, {
      [membership.groupId]: {
        isMember: true,
        role: membership.role,
        memberStatus: membership.status,
        activeMembership: membership.active,
      },
    })
  })

  return groups.map((group: Group) => {
    const membership = groupMembershipMap[group.id]

    return {
      ...group,
      ...membership,
    }
  })
}

export const badgeForIsMember = (isMember: boolean, record: GroupTableItem) => {
  if (!isMember) {
    return <span />
  }

  const color = record.activeMembership ? 'success' : 'orange'
  const tooltipText = record.activeMembership ? 'Active Subscription' : 'Subscription is not active'

  return (
    <div style={{ textAlign: 'center' }}>
      <span className={`font-size-21 text-${color}`}>
        <Tooltip title={tooltipText} color="blue">
          {record.activeMembership ? (
            <i className="fa fa-check-circle" />
          ) : (
            <i className="fa fa-warning" />
          )}
        </Tooltip>
      </span>
    </div>
  )
}
export const badgeForIsActiveGroup = (active: boolean) => {
  return (
    <span
      className={active ? 'font-size-12 badge badge-primary' : 'font-size-12 badge badge-default'}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}
