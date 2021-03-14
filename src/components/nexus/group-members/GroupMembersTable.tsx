import React, { FC, useState } from 'react'
import { Table, Button, PageHeader, Spin, Divider } from 'antd'

/* eslint-disable */
import { GroupMembersTableRow, createGroupMembersTableData } from './groupMembersTableUtils'
import {
  useGetGroupMembersQuery,
  MembershipRole as RemoteMembershipRole,
  MembershipStatus as RemoteMembershipStatus,
} from '../../../graphql'
import { ColumnType } from 'antd/lib/table'
/* eslint-enable */

interface GroupMembersTableProps {
  groupId: string
  onClickInvite: () => void
  onClickGroupMember: (groupMemberId: string) => void
}

const groupMembersTableColumns = (showTrades: boolean): ColumnType<GroupMembersTableRow>[] => {
  const columns: ColumnType<GroupMembersTableRow>[] = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => <Button type="link">{text.split('-')[0]}</Button>,
    },
  ]

  if (showTrades) {
    columns.push({
      title: 'Trades',
      dataIndex: 'trades',
      key: 'trades',
    })
  }

  return columns
}

const PAGE_SIZE = 20

export const GroupMembersTable: FC<GroupMembersTableProps> = ({
  groupId,
  onClickInvite,
  onClickGroupMember,
}) => {
  const [adminsOffset, setAdminsOffset] = useState<number>(0)
  const [membersOffset, setMembersOffset] = useState<number>(0)

  const onChangeAdminsPage = (page: number, pageSize?: number) => {
    setAdminsOffset(pageSize ? pageSize * (page - 1) : 0)
  }

  const onChangeMembersPage = (page: number, pageSize?: number) => {
    setMembersOffset(pageSize ? pageSize * (page - 1) : 0)
  }

  const { data: groupAdminsData, loading: fetchingGroupAdmins } = useGetGroupMembersQuery({
    variables: {
      groupInput: { groupId },
      membersInput: {
        limit: PAGE_SIZE,
        offset: adminsOffset,
        roles: [RemoteMembershipRole.Admin],
        statuses: [RemoteMembershipStatus.Approved],
      },
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const { data: groupMembersData, loading: fetchingGroupMembers } = useGetGroupMembersQuery({
    variables: {
      groupInput: { groupId },
      membersInput: {
        limit: PAGE_SIZE,
        offset: membersOffset,
        roles: [RemoteMembershipRole.Member],
        statuses: [RemoteMembershipStatus.Approved],
      },
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const adminsCount = groupAdminsData?.group?.members?.totalCount
  const membersCount = groupMembersData?.group?.members?.totalCount

  const groupAdminsTableData: GroupMembersTableRow[] = createGroupMembersTableData(groupAdminsData)
  const groupMembersTableData: GroupMembersTableRow[] = createGroupMembersTableData(
    groupMembersData,
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
          <Divider orientation="left">
            <strong>Admins</strong>
          </Divider>
          <Spin spinning={fetchingGroupAdmins}>
            <Table
              rowKey="id"
              onRow={onRow}
              columns={groupMembersTableColumns(false)}
              dataSource={groupAdminsTableData}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: PAGE_SIZE,
                total: adminsCount,
                onChange: onChangeAdminsPage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Spin>
          <Divider orientation="left">
            <strong>Members</strong>
          </Divider>
          <Spin spinning={fetchingGroupMembers}>
            <Table
              rowKey="id"
              onRow={onRow}
              columns={groupMembersTableColumns(true)}
              dataSource={groupMembersTableData}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: PAGE_SIZE,
                total: membersCount,
                onChange: onChangeMembersPage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Spin>
        </div>
      </div>
    </>
  )
}
