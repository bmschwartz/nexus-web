import React, { FC } from 'react'
import { Button, PageHeader, Spin } from 'antd'

/* eslint-disable */
// import { createMemberOrderTableData, OrdersTableItem } from './memberOrdersTableUtils'
import { useGetMyOrdersQuery } from '../../../graphql'
/* eslint-enable */

interface MyOrdersTableProps {
  onClickOrder: (orderId: string) => void
}

const orderTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <Button type="link">{text.split('-')[0]}</Button>,
  },
  {
    title: 'Group',
    dataIndex: 'groupName',
    key: 'group',
  },
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
]

console.log(orderTableColumns)

const PAGE_SIZE = 15

export const MyOrdersTable: FC<MyOrdersTableProps> = () => {
  // const onChangePage = (page: number, pageSize?: number) => {
  //   const offset = pageSize ? pageSize * (page - 1) : 0
  //   fetchMore({
  //     variables: { offset },
  //     updateQuery: (prev, result) => {
  //       if (!result.fetchMoreResult) {
  //         return prev
  //       }
  //       const fetchedResult: object = result.fetchMoreResult as object
  //       return { ...fetchedResult }
  //     },
  //   })
  // }

  const {
    data: myOrdersData,
    loading: fetchingMyOrders,
    // fetchMore,
  } = useGetMyOrdersQuery({
    fetchPolicy: 'cache-and-network',
    variables: { ordersInput: { limit: PAGE_SIZE } },
    notifyOnNetworkStatusChange: true,
  })

  const memberships = myOrdersData?.me?.memberships
  const totalCount = memberships?.reduce((total: number, current: any) => {
    console.log(total, current)
    return total + 1
  }, 0)

  console.log(memberships, totalCount)

  // const orderTableData: OrdersTableItem[] = createMyOrderTableData(myOrdersData)
  //
  // const onRow = (row: OrdersTableItem) => {
  //   return {
  //     onClick: () => {
  //       onClickOrder(row.id)
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
          <Spin spinning={fetchingMyOrders}>
            {/*
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
                showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
            */}
          </Spin>
        </div>
      </div>
    </>
  )
}
