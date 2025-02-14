import { Exchange } from 'types/exchange'

/* eslint-disable */
import {
  BinanceSymbolStatus,
  GetCurrenciesBasicQuery,
  GetCurrencyQuery,
  GetSymbolsQuery,
} from '../graphql'
/* eslint-enable */

export interface IBinanceCurrency {
  id: string
  symbol: string
  status: BinanceSymbolStatus
  lastPrice?: number
  minPrice: number
  maxPrice: number
  tickSize: number
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
}

export interface ISymbolMap {
  [Exchange.BITMEX]: string[]
}

export function extractCurrencyData(currencyInfo: GetCurrencyQuery | undefined) {
  console.log(currencyInfo)
  return {}
}

export function extractCurrenciesData(
  currencyInfo: GetCurrenciesBasicQuery | undefined,
): ICurrencyMap {
  const exchanges = [Exchange.BITMEX]

  let bitmexCurrencies = {}

  if (currencyInfo && currencyInfo.bitmexCurrencies) {
    bitmexCurrencies = currencyInfo.bitmexCurrencies.reduce(
      (acc, { symbol, markPrice, maxPrice, tickSize, ...otherInfo }) => ({
        ...acc,
        [symbol]: {
          minPrice: 0,
          maxPrice: Number(maxPrice),
          tickSize: Number(tickSize),
          ...otherInfo,
        },
      }),
      {},
    )
  }

  return {
    exchanges,
    Bitmex: bitmexCurrencies,
  }
}

export function extractSymbols(symbolInfo: GetSymbolsQuery | undefined): ISymbolMap {
  const bitmexSymbols = symbolInfo?.bitmexCurrencies.map(currency => currency.symbol) || []
  return {
    Bitmex: bitmexSymbols,
  }
}

function getSymbolPriceInfo(currencyInfo: ICurrencyMap, exchange: Exchange, symbol: string) {
  const defaultPriceInfo = {
    minPrice: 0,
    maxPrice: 1,
    tickSize: 0.1,
    lastPrice: null,
  }

  if (!symbol) {
    return defaultPriceInfo
  }
  switch (exchange) {
    case Exchange.BITMEX: {
      const { minPrice, maxPrice, tickSize, lastPrice } = currencyInfo.Bitmex[symbol]
      return {
        minPrice,
        maxPrice,
        tickSize,
        lastPrice,
      }
    }
    default:
      return defaultPriceInfo
  }
}

export function getCurrentPrice(currencyInfo: ICurrencyMap, exchange: Exchange, symbol: string) {
  return getSymbolPriceInfo(currencyInfo, exchange, symbol).lastPrice
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
