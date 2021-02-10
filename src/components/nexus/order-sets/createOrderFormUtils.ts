import * as Yup from 'yup'

/* Local */
import { OrderSide, OrderType, StopTriggerType } from 'types/order'
import { ICurrencyMap } from 'types/currency'

export enum StopOrderOption {
  NONE = 'None',
  STOP_LIMIT = 'Stop Limit',
  TRAILING_STOP = 'Trailing Stop',
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
      .when('orderType', {
        is: OrderType.LIMIT,
        then: Yup.number()
          .positive()
          .required(),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    stopOrderType: Yup.string()
      .label('Stop Order')
      .oneOf(Object.values(StopOrderOption))
      .required(),
    stopPrice: Yup.number()
      .label('Stop Price')
      .when('stopOrderType', {
        is: StopOrderOption.STOP_LIMIT,
        then: Yup.number()
          .positive()
          .required(),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    trailingStopPercent: Yup.number()
      .label('Trailing Stop Percent')
      .when('stopOrderType', {
        is: StopOrderOption.TRAILING_STOP,
        then: Yup.number()
          .positive()
          .max(100)
          .required(),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    stopTriggerType: Yup.string()
      .label('Stop Trigger Type')
      .oneOf(Object.values(StopTriggerType))
      .when('stopOrderType', {
        is: stopOrderType => stopOrderType !== StopOrderOption.NONE,
        then: Yup.string().required(),
        otherwise: Yup.string()
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
