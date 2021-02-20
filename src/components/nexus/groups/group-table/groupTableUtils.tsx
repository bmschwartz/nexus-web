import React from 'react'
import * as _ from 'lodash'
import { Group } from 'types/group'
import { Membership, MembershipRole, MembershipStatus } from 'types/membership'
import { Button } from 'antd'

export interface GroupTableItem {
  id: number
  name: string
  active: boolean
  isMember?: boolean
  activeMembership?: boolean
  memberRole?: MembershipRole
  memberStatus?: MembershipStatus
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

  const style = record.activeMembership ? 'primary' : ''

  return (
    <span className={`font-size-12 badge ${style}`}>
      <i className="fa fa-check-circle" />
    </span>
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

export const renderIsMember = (record: GroupTableItem) => {
  if (record.memberStatus) {
    console.log(record.memberStatus)
    switch (record.memberStatus) {
      case MembershipStatus.Approved:
        return 'Yes'
      case MembershipStatus.Pending:
        return 'Pending'
      default:
        break
    }
  }
  return <Button type="link">Request Access</Button>
}
