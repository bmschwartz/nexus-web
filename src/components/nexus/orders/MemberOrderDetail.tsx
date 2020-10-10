import React, { FC, useState } from 'react'
import { Button, Modal, notification, PageHeader, Spin } from 'antd'
import * as apollo from 'services/apollo'

/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
import { useGetOrderQuery, OrderStatus } from '../../../graphql'
import { ExclamationCircleOutlined } from '@ant-design/icons'
/* eslint-enable */

interface MemberOrderDetailProps {
  orderId: string
  onClickBack: () => void
}

function canCancelOrder(order: any) {
  return [OrderStatus.New, OrderStatus.PartiallyFilled].includes(order.status)
}

export const MemberOrderDetail: FC<MemberOrderDetailProps> = ({ onClickBack, orderId }) => {
  const { data, loading, refetch: refetchOrder } = useGetOrderQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: { id: orderId },
    },
    notifyOnNetworkStatusChange: true,
  })

  const [cancelingOrder, setCancelingOrder] = useState<boolean>(false)

  async function clickedDelete(order: any) {
    Modal.confirm({
      title: `Canceling ${order.exchange} ${order.symbol} order`,
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to cancel this order?',
      okText: 'Yes',
      okType: 'danger',
      async onOk() {
        setCancelingOrder(true)

        const { error, success } = await apollo.cancelOrder({ orderId: order.id })

        setCancelingOrder(false)

        if (success) {
          notification.success({
            message: `Canceled order`,
          })
        } else {
          notification.error({
            message: `Error canceling order`,
            description: error,
            duration: 3, // seconds
          })
        }

        refetchOrder()
      },
      onCancel() {},
    })
  }

  const order = data?.order

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Order Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin spinning={loading || cancelingOrder} tip="Fetching Order Set...">
        <div className="card-body">
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Exchange</strong>
            {order && order.exchange}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Symbol</strong>
            {order && order.symbol}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Price</strong>
            {order && order.price}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Side</strong>
            {order && order.side}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Order Type</strong>
            {order && order.orderType}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Status</strong>
            {order && order.status}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Quantity</strong>
            {order && order.quantity}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Filled Quantity</strong>
            {order && order.filledQty}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Created</strong>
            {order && displayTimeBeforeNow(order.createdAt)}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Last Updated</strong>
            {order && displayTimeBeforeNow(order.updatedAt)}
          </div>

          {order && canCancelOrder(order) && (
            <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
              <Button
                danger
                disabled={loading || cancelingOrder}
                onClick={() => clickedDelete(order)}
              >
                Cancel Order
              </Button>
            </div>
          )}
        </div>
      </Spin>
    </>
  )
}
