import React, { FC } from 'react'
import { Button, PageHeader, Spin, Table } from 'antd'

/* eslint-disable */
import { createOrderTableData, OrdersTableItem } from './memberOrdersTableUtils'
import { useGetMemberOrdersQuery } from '../../../graphql'
/* eslint-enable */

interface MemberOrdersTableProps {
  membershipId: string
  onClickOrder: (orderId: string) => void
}

const orderTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <Button type="link">{text}</Button>,
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

const PAGE_SIZE = 15

export const MemberOrdersTable: FC<MemberOrdersTableProps> = ({ membershipId, onClickOrder }) => {
  const onChangePage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    fetchMore({
      variables: { offset },
      updateQuery: (prev, result) => {
        if (!result.fetchMoreResult) {
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

  const onRow = (row: OrdersTableItem) => {
    return {
      onClick: () => {
        onClickOrder(row.id)
      },
    }
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Orders" backIcon={false} />
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Spin spinning={fetchingMemberOrders}>
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
              // onChange={handleTableChange}
            />
          </Spin>
        </div>
      </div>
    </>
  )
}
