import React, { FC } from 'react'
import { PageHeader, Spin, Table } from 'antd'

/* eslint-disable */
import { useGetGroupOrderSetDetailsQuery } from '../../../graphql'
/* eslint-enable */

interface OrderSetDetailProps {
  groupId: string
  orderSetId: string
  onClickBack: () => void
}

const OrdersTableColumns = [
  {
    title: 'ID',
    id: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Username',
    id: 'username',
    dataIndex: 'username',
  },
]

interface OrderTableRow {
  id: string
  username: string
}

function transformOrdersData(ordersData: any[]): OrderTableRow[] {
  return ordersData.map(order => ({
    id: order.id,
    username: order.membership.member.username,
  }))
}

export const OrderSetDetail: FC<OrderSetDetailProps> = ({ onClickBack, groupId, orderSetId }) => {
  console.log(groupId, orderSetId)
  const { data, loading } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
    },
  })

  const orderSet = data?.group?.orderSet

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Order Set Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin spinning={loading} tip="Fetching Order Set...">
        <div className="card-body">
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Exchange</strong>
            {orderSet && orderSet.exchange}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Symbol</strong>
            {orderSet && orderSet.symbol}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Price</strong>
            {orderSet && orderSet.price}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Side</strong>
            {orderSet && orderSet.side}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Order Type</strong>
            {orderSet && orderSet.orderType}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Percent</strong>
            {orderSet && `${orderSet.percent}%`}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Description</strong>
            {orderSet && orderSet.description}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Creation Date</strong>
            {orderSet && orderSet.createdAt}
          </div>
        </div>
        <div className="text-nowrap">
          <Table
            className="mr-5 ml-5"
            rowKey="id"
            columns={OrdersTableColumns}
            dataSource={transformOrdersData(orderSet?.orders || [])}
            // onChange={handleTableChange}
          />
        </div>
      </Spin>
    </>
  )
}
