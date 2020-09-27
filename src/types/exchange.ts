export enum Exchange {
  BITMEX = 'Bitmex',
  BINANCE = 'Binance',
}

export interface ExchangeAccount {
  id: string
  active: boolean
  exchange: Exchange
  apiKey: string
  apiSecret: string
}
