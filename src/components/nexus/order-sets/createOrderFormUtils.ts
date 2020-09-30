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

export function extractCurrencyData(currencyInfo: GetCurrenciesQuery | undefined): ICurrencyMap {
  const exchanges = [Exchange.BITMEX, Exchange.BINANCE]

  let bitmexCurrencies = {}
  let binanceCurrencies = {}

  if (currencyInfo) {
    binanceCurrencies = currencyInfo.binanceCurrencies.reduce(
      (acc, { symbol, ...otherInfo }) => ({
        ...acc,
        [symbol]: otherInfo,
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
    type: Yup.string()
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
