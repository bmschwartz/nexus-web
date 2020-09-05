import React, { FC } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { TablePaginationConfig } from 'antd/lib/table'
import { SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'

import { Group } from 'types/group'
import { Membership, MembershipStatus, MembershipRole } from 'types/membership'
import {
  GroupTableItem,
  createGroupTableData,
  badgeForStatus,
  badgeForIsActiveGroup,
  badgeForRole,
} from './utils'

interface GroupTableProps {
  groups: Group[]
  memberships: Membership[]
}

const columns = [
  {
    title: 'Member',
    dataIndex: 'isMember',
    key: 'isMember',
    render: (isMember: boolean) => (
      <span
        className={
          isMember ? 'font-size-12 badge badge-success' : 'font-size-12 badge badge-default'
        }
      >
        {isMember ? <i className="fa fa-check-circle" /> : ''}
      </span>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: GroupTableItem, b: GroupTableItem) => (a.name > b.name ? -1 : 1),
    render: (text: string) => (
      <a className="btn btn-sm btn-light" href="#" onClick={e => e.preventDefault()}>
        {text}
      </a>
    ),
  },
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    render: (active: boolean) => badgeForIsActiveGroup(active),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: MembershipRole) => badgeForRole(role),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: MembershipStatus) => badgeForStatus(status),
  },
]

const GroupTable: FC<GroupTableProps> = ({ groups, memberships }) => {
  const mergedTableData: GroupTableItem[] = createGroupTableData(groups, memberships)

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, React.ReactText[] | null>,
    sorter: SorterResult<GroupTableItem> | SorterResult<GroupTableItem>[],
    extra: TableCurrentDataSource<any>,
  ) => {
    console.log(pagination, filters, sorter, extra)
  }

  return (
    <div className="card">
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <h5 className="mb-0">Groups</h5>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Link className="btn btn-primary" to="/dashboard/alpha">
            Create Group
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={mergedTableData}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  )
}

export default GroupTable
