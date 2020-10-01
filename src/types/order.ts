/* eslint-disable */
import { OrderSide as RemoteOrderSide, OrderType as RemoteOrderType } from '../graphql'
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

export interface IOrder {
  id: string
  side: OrderSide
  orderType: OrderType
  price?: number
  quantity?: number
  stopPrice?: number
  symbol: string
  lastTimestamp: string
}

export interface IOrderSet {
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
