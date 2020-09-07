import React, { FC } from 'react'
import { Table } from 'antd'

import { history } from 'index'
import { Group } from 'types/group'
import { MembershipRole } from 'types/membership'

/* eslint-disable */
import {
  GroupMembershipRow,
  badgeForRole,
  badgeForIsActiveMember,
  createGroupMembersTableData,
} from './membersTableUtils'
/* eslint-enable */

const onRow = (row: GroupMembershipRow) => {
  return {
    onClick: () => {
      history.push(`/groups/${row.id}`)
    },
  }
}

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    sorter: (a: GroupMembershipRow, b: GroupMembershipRow) => (a.username > b.username ? -1 : 1),
    render: (text: string) => (
      <a className="btn btn-md btn-light" href="#">
        {text}
      </a>
    ),
  },
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    render: (active: boolean) => badgeForIsActiveMember(active),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (text: MembershipRole, record: GroupMembershipRow) => badgeForRole(record),
  },
]

interface GroupMembersProps {
  group: Group
}

export const GroupMembers: FC<GroupMembersProps> = ({ group }) => {
  const tableData: GroupMembershipRow[] = createGroupMembersTableData(group.memberships)

  return (
    <div className="card">
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <h5 className="mb-0">Members</h5>
        </div>
        <div className="d-flex flex-column justify-content-center">Invite Member</div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table rowKey="id" onRow={onRow} columns={columns} dataSource={tableData} />
        </div>
      </div>
    </div>
  )
}
