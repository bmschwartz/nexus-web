import React, { FC } from 'react'
import { Button, Comment, Modal, notification, PageHeader, Table } from 'antd'
import { connect } from 'react-redux'
import * as apollo from 'services/apollo'

import { history } from 'index'
import { Group } from 'types/group'
import { Membership, MembershipStatus } from 'types/membership'

/* eslint-disable */
import {
  badgeForIsActiveGroup,
  createGroupTableData,
  GroupTableItem,
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

const GroupTable: FC<GroupTableProps> = ({ groups, memberships, dispatch }) => {
  const mergedTableData: GroupTableItem[] = createGroupTableData(groups, memberships)

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
      render: (_: boolean, record: GroupTableItem) => renderIsMember(record, onClickRequestAccess),
    },
  ]

  const onClickRequestAccess = async (groupId: string) => {
    const { success, error } = await apollo.requestGroupAccess({ groupId })
    if (success) {
      notification.success({
        message: 'Requested Membership',
        duration: 3, // seconds
      })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } else {
      notification.error({
        message: 'Error',
        description: error,
        duration: 3, // seconds
      })
    }
  }

  const onRow = (row: GroupTableItem) => {
    return {
      onClick: (event: any) => {
        if (event.target.innerText === 'Request Access') {
          return
        }

        if (row.memberStatus !== MembershipStatus.Approved) {
          const content =
            row.memberStatus === MembershipStatus.Pending
              ? 'Membership Approval is Pending'
              : 'Request access to become a member'

          Modal.info({
            title: 'Not a Member',
            content,
            maskClosable: true,
          })
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
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="id"
            onRow={onRow}
            columns={columns}
            dataSource={mergedTableData}
            expandable={{
              rowExpandable: record => !!record.description,
              expandedRowRender: (record: GroupTableItem) => (
                <Comment content={<p>{record.description}</p>} />
              ),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(GroupTable)
