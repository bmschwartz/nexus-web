import React, { FC } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { TablePaginationConfig } from 'antd/lib/table'
import { SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import { Group } from 'types/group'

interface GroupTableProps {
  groups: Group[]
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: Group, b: Group) => (a.name > b.name ? -1 : 1),
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
    render: (active: boolean) => (
      <span
        className={active ? 'font-size-12 badge badge-success' : 'font-size-12 badge badge-default'}
      >
        {active ? 'Active' : 'Inactive'}
      </span>
    ),
  },
]

const GroupTable: FC<GroupTableProps> = ({ groups }) => {
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, React.ReactText[] | null>,
    sorter: SorterResult<Group> | SorterResult<Group>[],
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
          {/* <a className="btn btn-primary" href="#" onClick={createGroupClicked}>
            Create Group
          </a> */}
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table rowKey="id" columns={columns} dataSource={groups} onChange={handleTableChange} />
        </div>
      </div>
    </div>
  )
}

export default GroupTable
