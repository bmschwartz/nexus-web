export enum Exchange {
  BITMEX = 'Bitmex',
  BINANCE = 'Binance',
}

interface ExchangeMetadata {
  name: String
  fields: String[]
  symbols: String[]
}

const sharedFields = ['symbol', 'side', 'type', 'price', 'percent', 'leverage', 'stopLoss']

export const EXCHANGE_METADATA: ExchangeMetadata[] = [
  {
    name: Exchange.BITMEX,
    fields: [...sharedFields, 'trailingStopLoss'],
    symbols: ['BTCUSD', 'ETHUSD', 'LTCUSD'],
  },
  {
    name: Exchange.BINANCE,
    fields: [...sharedFields],
    symbols: ['BTCUSD', 'ETHUSD', 'LTCUSD', 'BCHUSD'],
  },
]
