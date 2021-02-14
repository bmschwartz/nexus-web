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
      .required('Exchange is Required'),
    symbol: Yup.string()
      .label('Symbol')
      .required('Symbol is Required'),
    side: Yup.string()
      .label('Side')
      .oneOf(Object.values(OrderSide))
      .required('Side is Required'),
    orderType: Yup.string()
      .label('Type')
      .oneOf(Object.values(OrderType))
      .required('Order Type is Required'),
    price: Yup.number()
      .label('Price')
      .when('orderType', {
        is: OrderType.LIMIT,
        then: Yup.number()
          .positive('Price must be a positive number')
          .required(),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    stopOrderType: Yup.string()
      .label('Stop Order')
      .oneOf(Object.values(StopOrderOption))
      .required('Stop Order Type is Required'),
    stopPrice: Yup.number()
      .label('Stop Price')
      .when('stopOrderType', {
        is: StopOrderOption.STOP_LIMIT,
        then: Yup.number()
          .positive('Stop Price is Required')
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
          .min(0, 'TSL Percent must be more than 0')
          .max(100, 'TSL Percent must be less than 100')
          .required('TSL Percent is required'),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    stopTriggerType: Yup.string()
      .label('Stop Trigger Type')
      .oneOf(Object.values(StopTriggerType))
      .when('stopOrderType', {
        is: stopOrderType => stopOrderType !== StopOrderOption.NONE,
        then: Yup.string().required('Stop Trigger Type is Required'),
        otherwise: Yup.string()
          .nullable()
          .notRequired(),
      }),
    percent: Yup.number()
      .label('Balance Percent')
      .positive()
      .min(1, 'Balance Percent must be at least 1')
      .max(100, 'Balance Percent must be less than 100')
      .required('Balance Percent is required'),
    leverage: Yup.number()
      .label('Leverage')
      .positive()
      .min(1, 'Leverage must be at least 1')
      .max(100, 'Leverage must be less than 100')
      .required('Leverage is required'),
    description: Yup.string()
      .label('Description')
      .max(500)
      .optional(),
    exchangeAccountIds: Yup.array().label('Members'),
  })
}
