import React from 'react'
import * as _ from 'lodash'
import { Group } from 'types/group'
import { Membership, MembershipStatus, MembershipRole } from 'types/membership'

export interface GroupTableItem {
  id: number
  name: string
  active: boolean
  isMember?: boolean
  activeMembership?: boolean
  memberRole?: MembershipRole
  memberStatus?: MembershipStatus
}

interface Badge {
  style: string
  text: string
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
        memberRole: membership.role,
        memberStatus: membership.status,
        activeMembership: membership.active,
      },
    })
  })

  const groupTableItems: GroupTableItem[] = groups.map((group: Group) => {
    const membership = groupMembershipMap[group.id]

    return {
      ...group,
      ...membership,
    }
  })
  return groupTableItems
}

export const badgeForIsMember = (isMember: boolean, record: GroupTableItem) => {
  if (!isMember) {
    return <span />
  }

  const style = record.activeMembership ? 'badge-success' : 'badge-danger'

  return (
    <span className={`font-size-12 badge ${style}`}>
      <i className="fa fa-check-circle" />
    </span>
  )
}
export const badgeForIsActiveGroup = (active: boolean) => {
  return (
    <span
      className={active ? 'font-size-12 badge badge-success' : 'font-size-12 badge badge-default'}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}

export const badgeForRole = ({ memberRole: role }: GroupTableItem) => {
  const badge: Badge = {
    style: '',
    text: '',
  }
  switch (role) {
    case MembershipRole.Admin:
      badge.style = 'badge-success'
      badge.text = 'Admin'
      break
    case MembershipRole.Trader:
      badge.style = 'badge-primary'
      badge.text = 'Trader'
      break
    case MembershipRole.Member:
      badge.style = 'badge-default'
      badge.text = 'Member'
      break
    default:
      return <span />
  }

  return <span className={`font-size-12 badge ${badge.style}`}>{badge.text}</span>
}

export const badgeForStatus = ({ memberStatus: status }: GroupTableItem) => {
  const badge: Badge = {
    style: '',
    text: '',
  }
  switch (status) {
    case MembershipStatus.Approved:
      badge.style = 'badge-success'
      badge.text = 'Approved'
      break
    case MembershipStatus.Pending:
      badge.style = 'badge-primary'
      badge.text = 'Pending'
      break
    case MembershipStatus.Denied:
      badge.style = 'badge-danger'
      badge.text = 'Denied'
      break
    default:
      return <span />
  }

  return <span className={`font-size-12 badge ${badge.style}`}>{badge.text}</span>
}
