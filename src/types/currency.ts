import { Exchange } from 'types/exchange'

/* eslint-disable */
import { BinanceSymbolStatus, GetCurrenciesQuery } from '../graphql'
/* eslint-enable */

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

export interface ICurrencyMap {
  exchanges: Exchange[]
  [Exchange.BITMEX]: {
    [key: string]: IBitmexCurrency
  }
  [Exchange.BINANCE]: {
    [key: string]: IBinanceCurrency
  }
}

export function extractCurrencyData(currencyInfo: GetCurrenciesQuery | undefined): ICurrencyMap {
  const exchanges = [Exchange.BITMEX, Exchange.BINANCE]

  let bitmexCurrencies = {}
  let binanceCurrencies = {}

  if (currencyInfo) {
    binanceCurrencies = currencyInfo.binanceCurrencies.reduce(
      (acc, { symbol, minPrice, maxPrice, tickSize, ...otherInfo }) => ({
        ...acc,
        [symbol]: {
          minPrice: Number(minPrice),
          maxPrice: Number(maxPrice),
          tickSize: Number(tickSize),
          ...otherInfo,
        },
      }),
      {},
    )
    bitmexCurrencies = currencyInfo.bitmexCurrencies.reduce(
      (acc, { symbol, markPrice, maxPrice, tickSize, ...otherInfo }) => ({
        ...acc,
        [symbol]: {
          minPrice: markPrice,
          maxPrice: Number(maxPrice),
          tickSize: Number(tickSize),
          otherInfo,
        },
      }),
      {},
    )
  }

  return {
    exchanges,
    Bitmex: bitmexCurrencies,
    Binance: binanceCurrencies,
  }
}

function getSymbolPriceInfo(currencyInfo: ICurrencyMap, exchange: Exchange, symbol: string) {
  const defaultPriceInfo = {
    minPrice: 0,
    maxPrice: 1,
    tickSize: 0.1,
  }

  if (!symbol) {
    return defaultPriceInfo
  }
  switch (exchange) {
    case Exchange.BINANCE: {
      const { minPrice, maxPrice, tickSize } = currencyInfo.Binance[symbol]
      return {
        minPrice,
        maxPrice,
        tickSize,
      }
    }
    case Exchange.BITMEX: {
      const { minPrice, maxPrice, tickSize } = currencyInfo.Bitmex[symbol]
      return {
        minPrice,
        maxPrice,
        tickSize,
      }
    }
    default:
      return defaultPriceInfo
  }
}

export function getMinPrice(currencyInfo: ICurrencyMap, exchange: Exchange, symbol: string) {
  return getSymbolPriceInfo(currencyInfo, exchange, symbol).minPrice
}

export function getMaxPrice(currencyInfo: ICurrencyMap, exchange: Exchange, symbol: string) {
  return getSymbolPriceInfo(currencyInfo, exchange, symbol).maxPrice
}

export function getPriceTickSize(currencyInfo: ICurrencyMap, exchange: Exchange, symbol: string) {
  return getSymbolPriceInfo(currencyInfo, exchange, symbol).tickSize
}
