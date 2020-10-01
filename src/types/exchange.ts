/* eslint-disable */
import { Exchange as RemoteExchange } from '../graphql'
/* eslint-enable */

export enum Exchange {
  BITMEX = 'Bitmex',
  BINANCE = 'Binance',
}

export interface IExchangeAccount {
  id: string
  active: boolean
  exchange: Exchange
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
