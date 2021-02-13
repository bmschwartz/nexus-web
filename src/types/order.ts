/* eslint-disable */
import {
  OrderSide as RemoteOrderSide,
  OrderStatus as RemoteOrderStatus,
  OrderType as RemoteOrderType,
  StopTriggerType as RemoteStopTriggerType,
} from '../graphql'
import { Exchange } from './exchange'

/* eslint-enable */

export enum OrderSide {
  BUY = 'Buy',
  SELL = 'Sell',
}

export enum OrderType {
  MARKET = 'Market',
  LIMIT = 'Limit',
}

export enum OrderStatus {
  NEW = 'New',
  FILLED = 'Filled',
  PARTIALLY_FILLED = 'Partially Filled',
  REJECTED = 'Rejected',
  CANCELED = 'Canceled',
}

export enum StopOrderType {
  NONE = 'NONE',
  STOP_LIMIT = 'STOP_LIMIT',
  TRAILING_STOP = 'TRAILING_STOP',
}

export enum StopTriggerType {
  NONE = 'None',
  LAST_PRICE = 'Last Price',
  MARK_PRICE = 'Mark Price',
}

export interface Order {
  id: string
  side: OrderSide
  orderType: OrderType
  exchange: Exchange
  status: OrderStatus
  price?: number
  error?: string
  quantity?: number
  filledQty?: number
  stopPrice?: number
  symbol: string
  lastTimestamp: string
}

export interface OrderSet {
  id: string
  exchange: Exchange
  price?: number
  stopPrice?: number
  side: OrderSide
  orderType: OrderType
  symbol: string
  createdAt: string
}

export function convertToLocalOrderSide(side: RemoteOrderSide): OrderSide {
  switch (side) {
    case RemoteOrderSide.Buy:
      return OrderSide.BUY
    case RemoteOrderSide.Sell:
    default:
      return OrderSide.SELL
  }
}

export function convertToLocalOrderType(orderType: RemoteOrderType): OrderType {
  switch (orderType) {
    case RemoteOrderType.Limit:
      return OrderType.LIMIT
    case RemoteOrderType.Market:
    default:
      return OrderType.MARKET
  }
}

export function convertToLocalOrderStatus(orderStatus: RemoteOrderStatus): OrderStatus {
  switch (orderStatus) {
    case RemoteOrderStatus.Filled:
      return OrderStatus.FILLED

    case RemoteOrderStatus.PartiallyFilled:
      return OrderStatus.PARTIALLY_FILLED

    case RemoteOrderStatus.Canceled:
      return OrderStatus.CANCELED

    case RemoteOrderStatus.Rejected:
      return OrderStatus.REJECTED

    case RemoteOrderStatus.New:
    default:
      return OrderStatus.NEW
  }
}

export function convertToLocalStopTriggerType(
  stopTriggerType: RemoteStopTriggerType,
): StopTriggerType | null {
  switch (stopTriggerType) {
    case RemoteStopTriggerType.LastPrice:
      return StopTriggerType.LAST_PRICE
    case RemoteStopTriggerType.MarkPrice:
      return StopTriggerType.MARK_PRICE
    default:
      return null
  }
}
