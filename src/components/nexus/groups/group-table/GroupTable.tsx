import React, { FC } from 'react'
import { Button, PageHeader, Table } from 'antd'
import { connect } from 'react-redux'

import { history } from 'index'
import { Group } from 'types/group'
import { Membership } from 'types/membership'

/* eslint-disable */
import { badgeForIsMember, createGroupTableData, GroupTableItem } from './groupTableUtils'
/* eslint-enable */

interface GroupTableProps {
  dispatch: any
  groups: Group[]
  memberships: Membership[]
}

const mapStateToProps = ({ dispatch }: any) => ({
  dispatch,
})

const GroupTable: FC<GroupTableProps> = ({ groups, memberships, dispatch }) => {
  const mergedTableData: GroupTableItem[] = createGroupTableData(groups, memberships)

  const columns = [
    {
      title: 'Member',
      dataIndex: 'isMember',
      key: 'member',
      width: '5%',
      render: (isMember: boolean, record: GroupTableItem) => badgeForIsMember(isMember, record),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Button type="link">{text}</Button>,
    },
  ]

  const onRow = (row: GroupTableItem) => {
    return {
      onClick: () => {
        dispatch({
          type: 'group/SET_GROUP_DETAIL_STATE',
          payload: {
            groupDetail: {
              groupId: row.id,
            },
          },
        })
        history.push(`/groups/${row.id}/dashboard`)
      },
    }
  }

  return (
    <div>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Groups" />
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
