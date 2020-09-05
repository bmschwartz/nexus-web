import React from 'react'
import * as _ from 'lodash'
import { Group } from 'types/group'
import { Membership, MembershipStatus, MembershipRole } from 'types/membership'

export interface GroupTableItem {
  id: number
  name: string
  active: boolean
  isMember: boolean
}

interface Badge {
  style: string
  text: string
}

export const createGroupTableData = (
  groups: Group[],
  memberships: Membership[],
): GroupTableItem[] => {
  const groupsMap = _.keyBy(groups, 'id')
  console.log(groupsMap)
  const membershipGroupIds = memberships.map(membership => membership.group.id)
  return groups.map(({ id: groupId, name, active }) => ({
    id: groupId,
    name,
    active,
    isMember: membershipGroupIds.includes(groupId),
    status: '',
  }))
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

export const badgeForRole = (role: MembershipRole) => {
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

export const badgeForStatus = (status: MembershipStatus) => {
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
