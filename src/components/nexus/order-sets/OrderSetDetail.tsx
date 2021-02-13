import React, { FC, useState } from 'react'
import { Button, Divider, message, Modal, PageHeader, Spin, Table } from 'antd'

/* eslint-disable */
import * as apollo from 'services/apollo'
import {
  OrderType,
  StopOrderType as RemoteStopOrderType,
  useGetGroupOrderSetDetailsQuery,
} from '../../../graphql'
import {
  OrdersTableColumns,
  StopOrdersTableColumns,
  TrailingOrdersTableColumns,
  transformOrdersData,
  transformStopOrdersData,
  transformTrailingStopOrdersData,
} from './orderSetDetailUtils'
import { displayTimeBeforeNow } from '../dateUtil'
import {
  StopOrderType,
  convertToLocalOrderSide,
  convertToLocalOrderType,
  convertToLocalStopTriggerType,
} from '../../../types/order'
import { convertToLocalExchange } from '../../../types/exchange'
import { ExclamationCircleOutlined } from '@ant-design/icons'

/* eslint-enable */

interface OrderSetDetailProps {
  groupId: string
  orderSetId: string
  onClickBack: () => void
}

const PAGE_SIZE = 50
const MESSAGE_DURATION = 3
const CANCEL_ORDER_SET_MESSAGE_KEY = 'cancel_order_set_message_key'

export const OrderSetDetail: FC<OrderSetDetailProps> = ({ onClickBack, groupId, orderSetId }) => {
  const [submittingCancelOrderSet, setSubmittingCancelOrderSet] = useState<boolean>(false)

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
      stopOrderType: RemoteStopOrderType.None,
    },
    notifyOnNetworkStatusChange: true,
  })

  const onChangeOrdersPage = (page: number, pageSize?: number) => {
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
    data: stopOrderSetDetailData,
    loading: stopOrderSetDetailLoading,
    fetchMore: fetchMoreStopOrders,
  } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
      limit: PAGE_SIZE,
      stopOrderType: RemoteStopOrderType.StopLimit,
    },
    notifyOnNetworkStatusChange: true,
  })

  const onChangeStopOrdersPage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    fetchMoreStopOrders({
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
    data: trailingStopOrderSetDetailData,
    loading: trailingStopOrderSetDetailLoading,
    fetchMore: fetchMoreTrailingStopOrders,
  } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
      limit: PAGE_SIZE,
      stopOrderType: RemoteStopOrderType.TrailingStop,
    },
    notifyOnNetworkStatusChange: true,
  })

  const onChangeTrailingStopOrdersPage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    fetchMoreTrailingStopOrders({
      variables: { offset },
      updateQuery: (prev, result) => {
        if (!result.fetchMoreResult) {
          return prev
        }
        return { ...result.fetchMoreResult }
      },
    })
  }

  const onClickCancelOrders = async (stopOrderTypes?: StopOrderType[]) => {
    Modal.confirm({
      title: `Canceling Open Orders`,
      icon: <ExclamationCircleOutlined />,
      content: `Open orders will be canceled`,
      okText: 'OK',
      okType: 'danger',
      async onOk() {
        setSubmittingCancelOrderSet(true)

        const { success, error } = await apollo.cancelOrderSet({ orderSetId, stopOrderTypes })
        console.log(success, error)
        if (success) {
          message.success({ content: 'Canceling Orders...' })
        } else {
          message.error({
            content: 'Error Canceling Orders',
            key: CANCEL_ORDER_SET_MESSAGE_KEY,
            duration: MESSAGE_DURATION,
          })
        }

        setSubmittingCancelOrderSet(false)
      },
      onCancel() {},
    })
  }

  const totalNormalOrdersCount = orderSetDetailData?.group?.orderSet?.orders.totalCount
  const totalStopOrdersCount = stopOrderSetDetailData?.group?.orderSet?.orders.totalCount
  const totalTrailingStopOrdersCount =
    trailingStopOrderSetDetailData?.group?.orderSet?.orders.totalCount

  const orderSet = orderSetDetailData?.group?.orderSet
  const stopOrdersOrderSet = stopOrderSetDetailData?.group?.orderSet
  const trailingStopOrdersOrderSet = trailingStopOrderSetDetailData?.group?.orderSet

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Order Set Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin
        spinning={
          orderSetDetailLoading || stopOrderSetDetailLoading || trailingStopOrderSetDetailLoading
        }
        tip="Fetching Order Set..."
      >
        <div className="card-body">
          <Divider orientation="left">General</Divider>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Exchange</strong>
            {orderSet && orderSet.exchange && convertToLocalExchange(orderSet.exchange)}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Symbol</strong>
            {orderSet && orderSet.symbol}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Side</strong>
            {orderSet && orderSet.side && convertToLocalOrderSide(orderSet.side)}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Price</strong>
            {orderSet &&
              orderSet.orderType &&
              (orderSet.orderType === OrderType.Limit ? orderSet.price : 'Market')}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Order Type</strong>
            {orderSet && orderSet.orderType && convertToLocalOrderType(orderSet.orderType)}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Close Order</strong>
            {orderSet && orderSet.closeOrderSet ? 'Yes' : 'No'}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Percent</strong>
            {orderSet && `${orderSet.percent}%`}
          </div>
          {orderSet && (orderSet.stopPrice || orderSet.trailingStopPercent) && (
            <>
              <Divider orientation="left">Stop Order</Divider>
              <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
                <strong className="mr-3">Stop Price</strong>
                {orderSet && orderSet.stopPrice}
              </div>
              <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
                <strong className="mr-3">Trailing Stop Percent</strong>
                {orderSet && orderSet.trailingStopPercent && `${orderSet.trailingStopPercent}%`}
              </div>
              <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
                <strong className="mr-3">Stop Trigger Type</strong>
                {orderSet &&
                  orderSet.stopTriggerType &&
                  convertToLocalStopTriggerType(orderSet.stopTriggerType)}
              </div>
            </>
          )}
          <Divider orientation="left">Additional</Divider>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Description</strong>
            {orderSet && orderSet.description}
          </div>
          <div className="d-flex flex-nowrap align-items-end mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Created</strong>
            {orderSet && displayTimeBeforeNow(orderSet.createdAt)}
          </div>
        </div>
        <Divider orientation="left">Orders</Divider>
        <Table
          className="mr-5 ml-5"
          rowKey="id"
          columns={OrdersTableColumns}
          dataSource={transformOrdersData(orderSet?.orders.orders || [])}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: PAGE_SIZE,
            total: totalNormalOrdersCount,
            onChange: onChangeOrdersPage,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
        <div className="text-right mt-1 pb-3 pl-4 mr-4 pr-4">
          <Button
            disabled={submittingCancelOrderSet}
            className="btn btn-outline-danger"
            onClick={async () => onClickCancelOrders([StopOrderType.NONE])}
          >
            Cancel Open Orders
          </Button>
        </div>
        {orderSet && orderSet.stopPrice && (
          <>
            <Divider orientation="left">Stop Orders</Divider>
            <Table
              className="mr-5 ml-5"
              rowKey="id"
              columns={StopOrdersTableColumns}
              dataSource={transformStopOrdersData(stopOrdersOrderSet?.orders.orders || [])}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: PAGE_SIZE,
                total: totalStopOrdersCount,
                onChange: onChangeStopOrdersPage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
            <div className="text-right mt-1 pb-3 pl-4 mr-4 pr-4">
              <Button
                disabled={submittingCancelOrderSet}
                className="btn btn-outline-danger"
                onClick={async () => onClickCancelOrders([StopOrderType.STOP_LIMIT])}
              >
                Cancel Open Stop Limit Orders
              </Button>
            </div>
          </>
        )}
        {orderSet && orderSet.trailingStopPercent && (
          <>
            <Divider orientation="left">Trailing Stop Orders</Divider>
            <Table
              className="mr-5 ml-5"
              rowKey="id"
              columns={TrailingOrdersTableColumns}
              dataSource={transformTrailingStopOrdersData(
                trailingStopOrdersOrderSet?.orders.orders || [],
              )}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: PAGE_SIZE,
                total: totalTrailingStopOrdersCount,
                onChange: onChangeTrailingStopOrdersPage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
            <div className="text-right mt-1 pb-3 pl-4 mr-4 pr-4">
              <Button
                disabled={submittingCancelOrderSet}
                className="btn btn-outline-danger"
                onClick={async () => onClickCancelOrders([StopOrderType.TRAILING_STOP])}
              >
                Cancel Open Trailing Stop Orders
              </Button>
            </div>
          </>
        )}
      </Spin>
    </>
  )
}
