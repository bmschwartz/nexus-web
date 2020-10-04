/* eslint-disable */
import { Exchange as RemoteExchange } from '../graphql'
import { Order } from './order'
/* eslint-enable */

export enum Exchange {
  BITMEX = 'Bitmex',
  BINANCE = 'Binance',
}

export interface ExchangeAccount {
  id: string
  active: boolean
  exchange: Exchange
  orders: Order[]
}

export function convertToLocalExchange(exchange: RemoteExchange): Exchange {
  switch (exchange) {
    case RemoteExchange.Binance:
      return Exchange.BINANCE
    case RemoteExchange.Bitmex:
    default:
      return Exchange.BITMEX
  }
}
