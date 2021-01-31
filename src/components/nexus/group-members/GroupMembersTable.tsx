import React, { FC } from 'react'
import { Table, Button, PageHeader } from 'antd'

/* eslint-disable */
import { Group } from 'types/group'
import {
  GroupMembersTableRow,
  badgeForRole,
  badgeForIsActiveMember,
  createGroupMembersTableData,
} from './groupMembersTableUtils'
import { MembershipRole } from 'types/membership'
/* eslint-enable */

interface GroupMembersTableProps {
  group: Group
  onClickInvite: () => void
  onClickGroupMember: (groupMemberId: string) => void
}

/**
 * const columns = [
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
 */

const groupMembersTableColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text: string) => <Button type="link">{text}</Button>,
    sorter: (a: GroupMembersTableRow, b: GroupMembersTableRow) =>
      a.username > b.username ? -1 : 1,
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
    render: (text: MembershipRole, record: GroupMembersTableRow) => badgeForRole(record),
  },
]

const PAGE_SIZE = 10

export const GroupMembersTable: FC<GroupMembersTableProps> = ({
  group,
  onClickInvite,
  onClickGroupMember,
}) => {
  // const onChangePage = (page: number, pageSize?: number) => {
  //   const offset = pageSize ? pageSize * (page - 1) : 0
  //   fetchMore({
  //     variables: { offset },
  //     updateQuery: (prev, result) => {
  //       if (!result.fetchMoreResult) {
  //         return prev
  //       }
  //       return { ...result.fetchMoreResult }
  //     },
  //   })
  // }

  const totalCount = group.memberships.length
  const groupMembersTableData: GroupMembersTableRow[] = createGroupMembersTableData(
    group.memberships,
  )

  const onRow = (row: GroupMembersTableRow) => {
    return {
      onClick: () => {
        onClickGroupMember(row.id)
      },
    }
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Group Members" backIcon={false} />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Button className="btn btn-primary" onClick={onClickInvite}>
            Invite Member
          </Button>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="id"
            onRow={onRow}
            columns={groupMembersTableColumns}
            dataSource={groupMembersTableData}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: PAGE_SIZE,
              total: totalCount,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </div>
      </div>
    </>
  )
}
