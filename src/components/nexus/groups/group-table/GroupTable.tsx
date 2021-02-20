import React, { FC } from 'react'
import { Button, PageHeader, Table } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { TablePaginationConfig } from 'antd/lib/table'
// import { SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'

import { history } from 'index'
import { Group } from 'types/group'
import { Membership } from 'types/membership'

/* eslint-disable */
import {
  GroupTableItem,
  createGroupTableData,
  badgeForIsActiveGroup,
  renderIsMember,
} from './groupTableUtils'
/* eslint-enable */

interface GroupTableProps {
  dispatch: any
  groups: Group[]
  memberships: Membership[]
}

const mapStateToProps = ({ dispatch }: any) => ({
  dispatch,
})

const columns = [
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    render: (active: boolean) => badgeForIsActiveGroup(active),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: GroupTableItem, b: GroupTableItem) => (a.name > b.name ? -1 : 1),
    render: (text: string) => <Button type="link">{text}</Button>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: boolean, record: GroupTableItem) => renderIsMember(record),
  },
]

const GroupTable: FC<GroupTableProps> = ({ groups, memberships, dispatch }) => {
  const mergedTableData: GroupTableItem[] = createGroupTableData(groups, memberships)

  const onRow = (row: GroupTableItem) => {
    return {
      onClick: () => {
        if (!row.isMember) {
          return
        }

        dispatch({
          type: 'group/SET_GROUP_DETAIL_STATE',
          payload: {
            groupDetail: {
              groupId: row.id,
            },
          },
        })
        history.push(`/groups/${row.id}`)
      },
    }
  }

  return (
    <div>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Groups" />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Link className="btn btn-primary" to="/groups/create">
            Create Group
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table rowKey="id" onRow={onRow} columns={columns} dataSource={mergedTableData} />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(GroupTable)
