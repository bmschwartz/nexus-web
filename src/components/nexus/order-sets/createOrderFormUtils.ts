export enum Exchange {
  BITMEX = 'Bitmex',
  BINANCE = 'Binance',
}

interface ExchangeMetadata {
  name: String
  fields: String[]
}

const sharedFields = ['symbol', 'side', 'type', 'price', 'percent', 'leverage', 'stopLoss']

export const EXCHANGE_METADATA: { [key in Exchange]: ExchangeMetadata } = {
  [Exchange.BITMEX]: {
    name: Exchange.BITMEX,
    fields: [],
  },
  [Exchange.BINANCE]: {
    name: Exchange.BINANCE,
    fields: [...sharedFields],
  },
}
