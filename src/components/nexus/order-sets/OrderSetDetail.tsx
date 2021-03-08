import React, { FC, useState } from 'react'
import { Button, Divider, message, Modal, PageHeader, Select, Spin, Table } from 'antd'

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
  convertToLocalOrderSide,
  convertToLocalOrderType,
  convertToLocalStopTriggerType,
  convertToRemoteOrderStatus,
  OrderStatus,
  StopOrderType,
} from '../../../types/order'
import { convertToLocalExchange } from '../../../types/exchange'
import { ExclamationCircleOutlined } from '@ant-design/icons'

/* eslint-enable */

interface OrderSetDetailProps {
  groupId: string
  orderSetId: string
  onClickBack: () => void
}

const OrderStatusFilters = ['All', ...Object.values(OrderStatus)]

const DEFAULT_PAGE_SIZE = 20
const MESSAGE_DURATION = 3
const CANCEL_ORDER_SET_MESSAGE_KEY = 'cancel_order_set_message_key'

export const OrderSetDetail: FC<OrderSetDetailProps> = ({ onClickBack, groupId, orderSetId }) => {
  const [ordersPageSize, setOrdersPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const [tslOrdersPageSize, setTslOrdersPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const [stopOrdersPageSize, setStopOrdersPageSize] = useState<number>(DEFAULT_PAGE_SIZE)

  const [submittingCancelOrderSet, setSubmittingCancelOrderSet] = useState<boolean>(false)
  const [selectedOrderStatusFilter, setSelectedOrderStatusFilter] = useState<
    OrderStatus | undefined
  >()
  const [selectedStopOrderStatusFilter, setSelectedStopOrderStatusFilter] = useState<
    OrderStatus | undefined
  >()
  const [selectedTslOrderStatusFilter, setSelectedTslOrderStatusFilter] = useState<
    OrderStatus | undefined
  >()

  const {
    data: orderSetDetailData,
    loading: orderSetDetailLoading,
    fetchMore,
    refetch: refetchOrders,
  } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
      ordersInput: {
        limit: DEFAULT_PAGE_SIZE,
        stopOrderType: RemoteStopOrderType.None,
        orderStatus: convertToRemoteOrderStatus(selectedOrderStatusFilter),
      },
    },
    notifyOnNetworkStatusChange: true,
  })

  const onChangeOrderStatusFilter = async (
    stopOrderType: StopOrderType,
    selectedStatus?: OrderStatus,
  ) => {
    switch (stopOrderType) {
      case StopOrderType.NONE:
        setSelectedOrderStatusFilter(selectedStatus)
        break
      case StopOrderType.STOP_LIMIT:
        setSelectedStopOrderStatusFilter(selectedStatus)
        break
      case StopOrderType.TRAILING_STOP:
        setSelectedTslOrderStatusFilter(selectedStatus)
        break
      default:
        break
    }
  }

  const onChangeOrdersPage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0

    fetchMore({
      variables: {
        groupInput: { groupId },
        orderSetInput: { id: orderSetId },
        ordersInput: {
          offset,
          limit: ordersPageSize,
          stopOrderType: RemoteStopOrderType.None,
          orderStatus: convertToRemoteOrderStatus(selectedOrderStatusFilter),
        },
      },
      updateQuery: (prev, result) => {
        if (!result.fetchMoreResult) {
          return prev
        }
        const fetchedResult: object = result.fetchMoreResult as object
        return { ...fetchedResult }
      },
    })
  }

  const {
    data: stopOrderSetDetailData,
    loading: stopOrderSetDetailLoading,
    fetchMore: fetchMoreStopOrders,
    refetch: refetchStopOrders,
  } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
      ordersInput: {
        limit: DEFAULT_PAGE_SIZE,
        stopOrderType: RemoteStopOrderType.StopLimit,
        orderStatus: convertToRemoteOrderStatus(selectedStopOrderStatusFilter),
      },
    },
    notifyOnNetworkStatusChange: true,
  })

  const onChangeStopOrdersPage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    fetchMoreStopOrders({
      variables: {
        groupInput: { groupId },
        orderSetInput: { id: orderSetId },
        ordersInput: {
          offset,
          limit: stopOrdersPageSize,
          stopOrderType: RemoteStopOrderType.StopLimit,
          orderStatus: convertToRemoteOrderStatus(selectedStopOrderStatusFilter),
        },
      },
      updateQuery: (prev, result) => {
        if (!result.fetchMoreResult) {
          return prev
        }
        const fetchedResult: object = result.fetchMoreResult as object
        return { ...fetchedResult }
      },
    })
  }

  const {
    data: trailingStopOrderSetDetailData,
    loading: trailingStopOrderSetDetailLoading,
    fetchMore: fetchMoreTrailingStopOrders,
    refetch: refetchTrailingStopOrders,
  } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
      ordersInput: {
        limit: DEFAULT_PAGE_SIZE,
        stopOrderType: RemoteStopOrderType.TrailingStop,
        orderStatus: convertToRemoteOrderStatus(selectedTslOrderStatusFilter),
      },
    },
    notifyOnNetworkStatusChange: true,
  })

  const onChangeTrailingStopOrdersPage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    fetchMoreTrailingStopOrders({
      variables: {
        groupInput: { groupId },
        orderSetInput: { id: orderSetId },
        ordersInput: {
          offset,
          limit: tslOrdersPageSize,
          stopOrderType: RemoteStopOrderType.TrailingStop,
          orderStatus: convertToRemoteOrderStatus(selectedTslOrderStatusFilter),
        },
      },
      updateQuery: (prev, result) => {
        if (!result.fetchMoreResult) {
          return prev
        }
        const fetchedResult: object = result.fetchMoreResult as object
        return { ...fetchedResult }
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

        const { success } = await apollo.cancelOrderSet({ orderSetId, stopOrderTypes })
        if (success) {
          message.success({ content: 'Canceling Orders...' })
        } else {
          message.error({
            content: 'Error Canceling Orders',
            key: CANCEL_ORDER_SET_MESSAGE_KEY,
            duration: MESSAGE_DURATION,
          })
        }

        setTimeout(async () => {
          if (stopOrderTypes?.includes(StopOrderType.NONE)) {
            await refetchOrders()
          }
          if (stopOrderTypes?.includes(StopOrderType.STOP_LIMIT)) {
            await refetchStopOrders()
          }
          if (stopOrderTypes?.includes(StopOrderType.TRAILING_STOP)) {
            await refetchTrailingStopOrders()
          }
        }, 2500)

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
          <PageHeader className="site-page-header" title="Orders Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin
        spinning={
          orderSetDetailLoading || stopOrderSetDetailLoading || trailingStopOrderSetDetailLoading
        }
        tip="Fetching Orders..."
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
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Leverage</strong>
            {orderSet && `${orderSet.leverage}`}
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
        <div className="mr-5 ml-5 mb-2">
          Filter by Order Status
          <Select
            style={{ width: 200 }}
            size="large"
            className="ml-2"
            value={selectedOrderStatusFilter}
            onChange={async status => {
              await onChangeOrderStatusFilter(StopOrderType.NONE, status)
            }}
          >
            {OrderStatusFilters.map(val => (
              <Select.Option key={val || 'All'} value={val || 'All'}>
                {val || 'All'}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Table
          className="mr-5 ml-5"
          rowKey="id"
          columns={OrdersTableColumns}
          dataSource={transformOrdersData(orderSet?.orders.orders || [])}
          pagination={{
            defaultCurrent: 1,
            pageSize: ordersPageSize,
            total: totalNormalOrdersCount,
            onChange: onChangeOrdersPage,
            onShowSizeChange: (current, size) => setOrdersPageSize(size),
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
            <div className="mr-5 ml-5 mb-2">
              Filter by Order Status
              <Select
                style={{ width: 200 }}
                size="large"
                className="ml-2"
                value={selectedStopOrderStatusFilter}
                onChange={async status => {
                  await onChangeOrderStatusFilter(StopOrderType.STOP_LIMIT, status)
                }}
              >
                {OrderStatusFilters.map(val => (
                  <Select.Option key={val || 'All'} value={val || 'All'}>
                    {val || 'All'}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <Table
              className="mr-5 ml-5"
              rowKey="id"
              columns={StopOrdersTableColumns}
              dataSource={transformStopOrdersData(stopOrdersOrderSet?.orders.orders || [])}
              pagination={{
                defaultCurrent: 1,
                pageSize: stopOrdersPageSize,
                total: totalStopOrdersCount,
                onChange: onChangeStopOrdersPage,
                onShowSizeChange: (current, size) => setStopOrdersPageSize(size),
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
            <div className="mr-5 ml-5 mb-2">
              Filter by Order Status
              <Select
                style={{ width: 200 }}
                size="large"
                className="ml-2"
                value={selectedTslOrderStatusFilter}
                onChange={async status => {
                  await onChangeOrderStatusFilter(StopOrderType.TRAILING_STOP, status)
                }}
              >
                {OrderStatusFilters.map(val => (
                  <Select.Option key={val || 'All'} value={val || 'All'}>
                    {val || 'All'}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <Table
              className="mr-5 ml-5"
              rowKey="id"
              columns={TrailingOrdersTableColumns}
              dataSource={transformTrailingStopOrdersData(
                trailingStopOrdersOrderSet?.orders.orders || [],
              )}
              pagination={{
                defaultCurrent: 1,
                pageSize: tslOrdersPageSize,
                total: totalTrailingStopOrdersCount,
                onChange: onChangeTrailingStopOrdersPage,
                onShowSizeChange: (current, size) => setTslOrdersPageSize(size),
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
