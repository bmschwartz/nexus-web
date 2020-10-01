import React, { FC } from 'react'
import { Table, Button, PageHeader, Spin } from 'antd'

/* eslint-disable */
import {
  createOrderSetTableData,
  OrderSetTableColumns,
  OrderSetTableItem,
  OrderSetTableRow,
} from './orderSetTableUtils'
import { useGetGroupOrderSetsQuery } from '../../../graphql'
/* eslint-enable */

interface OrderSetTableProps {
  groupId: string
  onClickCreate: () => void
  onClickOrderSet: (orderSetId: String) => void
}

export const OrderSetTable: FC<OrderSetTableProps> = ({
  onClickCreate,
  onClickOrderSet,
  groupId,
}) => {
  const { data: groupOrderSetsData, loading: fetchingGroupOrderSets } = useGetGroupOrderSetsQuery({
    fetchPolicy: 'network-only',
    variables: { input: { groupId } },
  })

  const orderSetTableData: OrderSetTableItem[] = createOrderSetTableData(groupOrderSetsData)

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
          <Spin spinning={fetchingGroupOrderSets}>
            <Table
              rowKey="id"
              onRow={onRow}
              columns={OrderSetTableColumns}
              dataSource={orderSetTableData}
              // onChange={handleTableChange}
            />
          </Spin>
        </div>
      </div>
    </>
  )
}
