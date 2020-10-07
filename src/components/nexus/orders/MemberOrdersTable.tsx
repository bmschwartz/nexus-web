import React, { FC } from 'react'
import { Table, Button, PageHeader, Spin } from 'antd'

/* eslint-disable */
import { createOrderTableData, OrderTableItem } from './ordersTableUtils'
import { useGetMemberOrdersQuery } from '../../../graphql'
/* eslint-enable */

interface OrdersTableProps {
  membershipId: string
  onClickCreate: () => void
  onClickOrder: (orderId: string) => void
}

const orderTableColumns = [
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Side',
    dataIndex: 'side',
    key: 'side',
  },
  {
    title: 'Type',
    dataIndex: 'orderType',
    key: 'orderType',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Filled',
    dataIndex: 'filled',
    key: 'filled',
  },
  {
    title: 'Status',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
]

const PAGE_SIZE = 15

export const OrdersTable: FC<OrdersTableProps> = ({
  // onClickOrder,
  // onClickCreate,
  membershipId,
}) => {
  console.log(membershipId, PAGE_SIZE, orderTableColumns)
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
    data: memberOrdersData,
    loading: fetchingMemberOrders,
    fetchMore,
  } = useGetMemberOrdersQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { membershipId }, limit: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  })

  const totalCount = memberOrdersData?.membership.orders.totalCount
  const orderTableData: OrdersTableItem[] = createOrderTableData(memberOrdersData)

  // const onRow = (row: OrdersTableItem) => {
  //   return {
  //     onClick: () => {
  //       onClickOrders(row.id)
  //     },
  //   }
  // }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Orders" backIcon={false} />
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          {/* <Spin spinning={fetchingGroupOrderss}>
            <Table
              rowKey="id"
              onRow={onRow}
              columns={orderTableColumns}
              dataSource={orderTableData}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: PAGE_SIZE,
                total: totalCount,
                onChange: onChangePage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            // onChange={handleTableChange}
            />
          </Spin> */}
          <div>Hey!</div>
        </div>
      </div>
    </>
  )
}
