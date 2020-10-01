export enum Exchange {
  BITMEX = 'Bitmex',
  BINANCE = 'Binance',
}

export interface IExchangeAccount {
  id: string
  active: boolean
  exchange: Exchange
}
