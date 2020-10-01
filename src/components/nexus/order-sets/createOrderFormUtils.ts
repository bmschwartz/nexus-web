import * as Yup from 'yup'

/* Local */
import { Exchange } from 'types/exchange'
import { OrderSide, OrderType } from 'types/order'
import { IBinanceCurrency, IBitmexCurrency } from 'types/currency'
import { GetCurrenciesQuery } from 'graphql'

interface ExchangeMetadata {
  name: String
  fields: String[]
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
      (acc, { symbol, ...otherInfo }) => ({
        ...acc,
        [symbol]: otherInfo,
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
    case Exchange.BITMEX:
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

export const getCreateOrderSetSchema = (currencyData: ICurrencyMap) => {
  return Yup.object().shape({
    exchange: Yup.string()
      .label('Exchange')
      .oneOf(currencyData.exchanges)
      .required(),
    symbol: Yup.string()
      .label('Symbol')
      .required(),
    side: Yup.string()
      .label('Side')
      .oneOf(Object.values(OrderSide))
      .required(),
    orderType: Yup.string()
      .label('Type')
      .oneOf(Object.values(OrderType))
      .required(),
    price: Yup.number()
      .label('Price')
      .when('side', {
        is: OrderType.LIMIT,
        then: Yup.number()
          .positive()
          .required(),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    percent: Yup.number()
      .label('Balance Percent')
      .positive()
      .integer()
      .max(100)
      .required(),
    description: Yup.string()
      .label('Description')
      .max(500)
      .optional(),
    exchangeAccountIds: Yup.array().label('Members'),
  })
}
