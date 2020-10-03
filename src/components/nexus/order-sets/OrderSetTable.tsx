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

const PAGE_SIZE = 10

export const OrderSetTable: FC<OrderSetTableProps> = ({
  onClickCreate,
  onClickOrderSet,
  groupId,
}) => {
  const onChangePage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    fetchMore({
      variables: { offset },
      updateQuery: (prev, result) => {
        if (!result) {
          return prev
        }
        return { ...result.fetchMoreResult }
      },
    })
  }

  const {
    data: groupOrderSetsData,
    loading: fetchingGroupOrderSets,
    fetchMore,
  } = useGetGroupOrderSetsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { groupId }, limit: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  })

  const totalCount = groupOrderSetsData?.group?.orderSets.totalCount
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
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: PAGE_SIZE,
                total: totalCount,
                onChange: onChangePage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              // onChange={handleTableChange}
            />
          </Spin>
        </div>
      </div>
    </>
  )
}
