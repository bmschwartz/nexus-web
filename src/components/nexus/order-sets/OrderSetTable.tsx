import React, { FC } from 'react'
import { Table, Button, PageHeader } from 'antd'

/* eslint-disable */
import { OrderSetTableColumns, OrderSetTableRow } from './orderSetTableUtils'
/* eslint-enable */

interface OrderSetTableProps {
  onClickCreate: () => void
  onClickOrderSet: (orderSetId: String) => void
}

export const OrderSetTable: FC<OrderSetTableProps> = ({ onClickCreate, onClickOrderSet }) => {
  const onRow = (row: OrderSetTableRow) => {
    return {
      onClick: () => {
        onClickOrderSet(row.id)
      },
    }
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Order Sets" backIcon={false} />
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
