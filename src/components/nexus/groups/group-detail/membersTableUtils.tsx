import React from 'react'
import { Membership, MembershipStatus, MembershipRole } from 'types/membership'

export interface GroupMembershipRow {
  id: string
  active: boolean
  username: string
  role: MembershipRole
  status: MembershipStatus
}

interface Badge {
  style: string
  text: string
}

export const createGroupMembersTableData = (memberships: Membership[]): GroupMembershipRow[] => {
  return memberships.map(
    (membership: Membership): GroupMembershipRow => ({
      id: membership.id,
      active: membership.active,
      username: membership.username,
      role: membership.role,
      status: membership.status,
    }),
  )
}

export const badgeForIsActiveMember = (active: boolean) => {
  return (
    <span
      className={active ? 'font-size-12 badge badge-success' : 'font-size-12 badge badge-default'}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}

export const badgeForRole = ({ role }: GroupMembershipRow) => {
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

export const badgeForStatus = ({ status }: GroupMembershipRow) => {
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
