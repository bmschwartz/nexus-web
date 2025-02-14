import { convertToLocalOrderStatus, OrderStatus } from 'types/order'

/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
import { OrderType as RemoteOrderType } from '../../../graphql'
/* eslint-enable */

export const OrdersTableColumns = [
  {
    id: 'username',
    title: 'Username',
    dataIndex: 'username',
  },
  {
    id: 'price',
    title: 'Price',
    dataIndex: 'price',
  },
  {
    id: 'quantity',
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    id: 'filledQty',
    title: 'Filled',
    dataIndex: 'filledQty',
  },
  {
    id: 'filledPrice',
    title: 'Filled Price',
    dataIndex: 'filledPrice',
  },
  {
    id: 'status',
    title: 'Status',
    dataIndex: 'status',
  },
  {
    id: 'updatedAt',
    title: 'Updated',
    dataIndex: 'updatedAt',
  },
]

export const StopOrdersTableColumns = [
  {
    id: 'username',
    title: 'Username',
    dataIndex: 'username',
  },
  {
    id: 'stopPrice',
    title: 'Stop Price',
    dataIndex: 'stopPrice',
  },
  {
    id: 'quantity',
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    id: 'filledQty',
    title: 'Filled',
    dataIndex: 'filledQty',
  },
  {
    id: 'filledPrice',
    title: 'Filled Price',
    dataIndex: 'filledPrice',
  },
  {
    id: 'status',
    title: 'Status',
    dataIndex: 'status',
  },
  {
    id: 'updatedAt',
    title: 'Updated',
    dataIndex: 'updatedAt',
  },
]

export const TrailingOrdersTableColumns = [
  {
    id: 'username',
    title: 'Username',
    dataIndex: 'username',
  },
  {
    id: 'stopPrice',
    title: 'Stop Price',
    dataIndex: 'stopPrice',
  },
  {
    id: 'quantity',
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    id: 'filledQty',
    title: 'Filled',
    dataIndex: 'filledQty',
  },
  {
    id: 'filledPrice',
    title: 'Filled Price',
    dataIndex: 'filledPrice',
  },
  {
    id: 'status',
    title: 'Status',
    dataIndex: 'status',
  },
  {
    id: 'updatedAt',
    title: 'Updated',
    dataIndex: 'updatedAt',
  },
]

export interface OrderTableRow {
  id: string
  username: string
  status: string
  price?: string
  quantity?: string
  filledQty?: string
  filledPrice?: string
  updatedAt?: string
}

export interface StopOrderTableRow {
  id: string
  username: string
  status: string
  stopPrice?: string
  quantity?: string
  filledQty?: string
  filledPrice?: string
  updatedAt?: string
}

export interface TrailingStopOrderTableRow {
  id: string
  username: string
  status: string
  stopPrice?: string
  quantity?: string
  filledQty?: string
  filledPrice?: string
  updatedAt?: string
}

export function transformOrdersData(ordersData: any[]): OrderTableRow[] {
  return ordersData.map(order => {
    const {
      id,
      price,
      status,
      orderType,
      quantity,
      filledQty,
      filledPrice,
      error,
      updatedAt,
    } = order

    const localStatus = convertToLocalOrderStatus(status)
    const displayStatus = error ? `${localStatus} - ${error}` : localStatus
    const displayPrice = orderType === RemoteOrderType.Market ? 'Market' : price

    return {
      id,
      price: displayPrice,
      quantity,
      filledQty: localStatus === OrderStatus.FILLED ? quantity : filledQty,
      filledPrice,
      updatedAt: displayTimeBeforeNow(updatedAt),
      status: displayStatus,
      username: order.exchangeAccount.membership.member.username,
    }
  })
}

export function transformStopOrdersData(ordersData: any[]): StopOrderTableRow[] {
  return ordersData.map(order => {
    const { id, stopPrice, status, quantity, error, filledQty, filledPrice, updatedAt } = order

    const localStatus = convertToLocalOrderStatus(status)
    const displayStatus = error ? `${localStatus} - ${error}` : localStatus

    return {
      id,
      stopPrice,
      quantity,
      filledQty: localStatus === OrderStatus.FILLED ? quantity : filledQty,
      filledPrice,
      updatedAt: displayTimeBeforeNow(updatedAt),
      status: displayStatus,
      username: order.exchangeAccount.membership.member.username,
    }
  })
}

export function transformTrailingStopOrdersData(ordersData: any[]): TrailingStopOrderTableRow[] {
  return ordersData.map(order => {
    const { id, stopPrice, status, quantity, error, filledQty, filledPrice, updatedAt } = order

    const localStatus = convertToLocalOrderStatus(status)
    const displayStatus = error ? `${localStatus} - ${error}` : localStatus

    return {
      id,
      stopPrice,
      quantity,
      filledQty: localStatus === OrderStatus.FILLED ? quantity : filledQty,
      filledPrice,
      updatedAt: displayTimeBeforeNow(updatedAt),
      status: displayStatus,
      username: order.exchangeAccount.membership.member.username,
    }
  })
}
