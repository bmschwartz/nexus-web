import React, { FC } from 'react'
import { Group } from 'types/group'
import { Link } from 'react-router-dom'
import { Table } from 'antd'

import { history } from 'index'

/* eslint-disable */
import { OrderSetTableColumns, OrderSetTableRow } from './orderSetTableUtils'
/* eslint-enable */

const onRow = (groupId: String, row: OrderSetTableRow) => {
  return {
    onClick: () => {
      history.push(`/groups/${groupId}/sets/${row.id}`)
    },
  }
}

interface GroupOrderSetsProps {
  group: Group
}

export const GroupOrderSets: FC<GroupOrderSetsProps> = ({ group }) => {
  return (
    <div className="card">
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <h5 className="mb-0">Order Sets</h5>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Link className="btn btn-primary" to={`/groups/${group.id}/sets/create`}>
            Create Order Set
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="id"
            onRow={row => onRow(group.id, row)}
            columns={OrderSetTableColumns}
            dataSource={[]}
            // onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  )
}
