import { convertToLocalOrderStatus } from 'types/order'

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
  updatedAt?: string
}

export interface StopOrderTableRow {
  id: string
  username: string
  status: string
  stopPrice?: string
  quantity?: string
  filledQty?: string
  updatedAt?: string
}

export interface TrailingStopOrderTableRow {
  id: string
  username: string
  status: string
  stopPrice?: string
  quantity?: string
  filledQty?: string
  updatedAt?: string
}

export function transformOrdersData(ordersData: any[]): OrderTableRow[] {
  return ordersData.map(order => {
    const { id, price, status, orderType, quantity, filledQty, error, updatedAt } = order

    const localStatus = convertToLocalOrderStatus(status)
    const displayStatus = error ? `${localStatus} - ${error}` : localStatus
    const displayPrice = orderType === RemoteOrderType.Market ? 'Market' : price

    return {
      id,
      price: displayPrice,
      quantity,
      filledQty,
      updatedAt: displayTimeBeforeNow(updatedAt),
      status: displayStatus,
      username: order.exchangeAccount.membership.member.username,
    }
  })
}

export function transformStopOrdersData(ordersData: any[]): StopOrderTableRow[] {
  return ordersData.map(order => {
    const { id, stopPrice, status, quantity, filledQty, updatedAt } = order
    return {
      id,
      stopPrice,
      quantity,
      filledQty,
      updatedAt: displayTimeBeforeNow(updatedAt),
      status: convertToLocalOrderStatus(status),
      username: order.exchangeAccount.membership.member.username,
    }
  })
}

export function transformTrailingStopOrdersData(ordersData: any[]): TrailingStopOrderTableRow[] {
  return ordersData.map(order => {
    const { id, stopPrice, status, quantity, filledQty, updatedAt } = order
    return {
      id,
      stopPrice,
      quantity,
      filledQty,
      updatedAt: displayTimeBeforeNow(updatedAt),
      status: convertToLocalOrderStatus(status),
      username: order.exchangeAccount.membership.member.username,
    }
  })
}
