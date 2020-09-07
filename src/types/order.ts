export enum OrderSide {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum OrderType {
  Market = 'MARKET',
  Limit = 'LIMIT',
}

export interface Order {
  id: string
  side: OrderSide
  orderType: OrderType
  price?: number
  quantity?: number
  stopPrice?: number
  symbol: string
  lastTimestamp: string
}
