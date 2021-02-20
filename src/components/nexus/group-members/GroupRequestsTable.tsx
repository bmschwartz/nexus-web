import React, { FC, useState } from 'react'
import { Button, PageHeader, Spin, Table } from 'antd'

/* eslint-disable */
import { MembershipStatus, useGetPendingMemberRequestsQuery } from '../../../graphql'
import { createGroupRequestsTableData, PendingRequestTableRow } from './groupRequestsTableUtils'

/* eslint-enable */

interface GroupMembersTableProps {
  groupId: string
}

const groupMembersTableColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text: string) => text.split('-')[0],
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <Button type="link">Approve</Button>,
  },
]

const PAGE_SIZE = 20

export const GroupRequestsTable: FC<GroupMembersTableProps> = ({ groupId }) => {
  const [membersOffset, setMembersOffset] = useState<number>(0)

  const onChangeMembersPage = (page: number, pageSize?: number) => {
    setMembersOffset(pageSize ? pageSize * (page - 1) : 0)
  }

  const {
    data: groupMembersData,
    loading: fetchingGroupMembers,
  } = useGetPendingMemberRequestsQuery({
    variables: {
      groupInput: { groupId },
      membersInput: {
        limit: PAGE_SIZE,
        offset: membersOffset,
        statuses: [MembershipStatus.Pending],
      },
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const membersCount = groupMembersData?.group?.members?.totalCount

  const groupMembersTableData: PendingRequestTableRow[] = createGroupRequestsTableData(
    groupMembersData,
  )

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Membership Requests" backIcon={false} />
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Spin spinning={fetchingGroupMembers}>
            <Table
              rowKey="id"
              columns={groupMembersTableColumns}
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
