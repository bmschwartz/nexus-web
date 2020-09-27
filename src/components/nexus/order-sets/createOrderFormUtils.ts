import * as Yup from 'yup'

/* Local */
import { Exchange } from 'types/exchange'
import { OrderSide, OrderType } from 'types/order'

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

export const getCreateOrderSetSchema = () => {
  return Yup.object().shape({
    exchange: Yup.string()
      .label('Exchange')
      .oneOf(Object.values(Exchange))
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
    exchangeAccountIds: Yup.array()
      .label('Members')
      .required(),
  })
}
