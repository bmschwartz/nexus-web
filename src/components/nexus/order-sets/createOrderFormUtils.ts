import * as Yup from 'yup'

/* Local */
import { OrderSide, OrderType } from 'types/order'
import { ICurrencyMap } from 'types/currency'

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
      .when('orderType', {
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
