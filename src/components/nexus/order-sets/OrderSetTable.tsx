import React, { FC } from 'react'
import { Table, Button } from 'antd'

/* eslint-disable */
import { OrderSetTableColumns, OrderSetTableRow } from './orderSetTableUtils'
/* eslint-enable */

const onRow = (row: OrderSetTableRow) => {
  return {
    onClick: () => {
      console.log(`clicked order set ${row.id}`)
    },
  }
}

interface OrderSetTableProps {
  onClickCreate: () => void
}

export const OrderSetTable: FC<OrderSetTableProps> = ({ onClickCreate }) => {
  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <h5 className="mb-0">Order Sets</h5>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Button className="btn btn-primary" onClick={onClickCreate}>
            Create Order Set
          </Button>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="id"
            onRow={onRow}
            columns={OrderSetTableColumns}
            dataSource={[]}
            // onChange={handleTableChange}
          />
        </div>
      </div>
    </>
  )
}
