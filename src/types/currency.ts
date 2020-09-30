import { BinanceSymbolStatus } from '../graphql'

export interface IBinanceCurrency {
  id: string
  symbol: string
  status: BinanceSymbolStatus
  lastPrice?: number
  openPrice?: number
  highPrice?: number
  lowPrice?: number
  priceChange?: number
  priceChangePercent?: number
  minPrice: number
  maxPrice: number
  tickSize: number
  baseAsset: string
  quoteAsset: string
  baseAssetPrecision: number
  quotePrecision: number
  quoteAssetPrecision: number
  baseCommissionPrecision: number
  quoteCommissionPrecision: number
  allowsLimit: boolean
  allowsMarket: boolean
  allowsStopLoss: boolean
  allowsStopLossLimit: boolean
  allowsTakeProfit: boolean
  allowsTakeProfitLimit: boolean
}

export interface IBitmexCurrency {
  id: string
  symbol: string
  underlying: string
  active: boolean
  fractionalDigits: number
  lastPrice: number
  markPrice: number
  tickSize: number
  minPrice: number
  maxPrice: number
}
