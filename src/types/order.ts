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
