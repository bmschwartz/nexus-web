/* eslint-disable */
import { Exchange as RemoteExchange } from '../graphql'
/* eslint-enable */

export enum Exchange {
  BITMEX = 'Bitmex',
}

export interface ExchangeAccount {
  id: string
  active: boolean
  exchange: Exchange
  createdAt: string
  orderCount: number
}

export function convertToLocalExchange(exchange: RemoteExchange): Exchange {
  switch (exchange) {
    case RemoteExchange.Bitmex:
    default:
      return Exchange.BITMEX
  }
}

export function convertToRemoteExchange(exchange?: Exchange): RemoteExchange | undefined {
  switch (exchange) {
    case Exchange.BITMEX:
      return RemoteExchange.Bitmex
    default:
      return undefined
  }
}
