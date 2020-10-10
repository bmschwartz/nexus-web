import React, { FC } from 'react'
import { PageHeader, Spin, Table } from 'antd'

/* eslint-disable */
import { useGetGroupOrderSetDetailsQuery } from '../../../graphql'
import { OrdersTableColumns, transformOrdersData } from './orderSetDetailUtils'
import { displayTimeBeforeNow } from '../dateUtil'
/* eslint-enable */

interface OrderSetDetailProps {
  groupId: string
  orderSetId: string
  onClickBack: () => void
}

const PAGE_SIZE = 100

export const OrderSetDetail: FC<OrderSetDetailProps> = ({ onClickBack, groupId, orderSetId }) => {
  const {
    data: orderSetDetailData,
    loading: orderSetDetailLoading,
    fetchMore,
  } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
      limit: PAGE_SIZE,
    },
    notifyOnNetworkStatusChange: true,
  })

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

  const totalCount = orderSetDetailData?.group?.orderSet?.orders.totalCount
  const orderSet = orderSetDetailData?.group?.orderSet

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Order Set Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin spinning={orderSetDetailLoading} tip="Fetching Order Set...">
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
            <strong className="mr-3">Created</strong>
            {orderSet && displayTimeBeforeNow(orderSet.createdAt)}
          </div>
        </div>
        <div className="text-nowrap">
          <Table
            className="mr-5 ml-5"
            rowKey="id"
            columns={OrdersTableColumns}
            dataSource={transformOrdersData(orderSet?.orders.orders || [])}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: PAGE_SIZE,
              total: totalCount,
              onChange: onChangePage,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            // onChange={handleTableChange}
          />
        </div>
      </Spin>
    </>
  )
}
