/* eslint-disable */
import { client } from './client'
import {
  CancelOrderDocument,
  CancelOrderSetDocument,
  CreateOrderSetDocument,
  CreateOrderSetInput as RemoteCreateOrderSetInput,
  Exchange as RemoteExchange,
  OrderSide as RemoteOrderSide,
  OrderType as RemoteOrderType,
  StopTriggerType as RemoteStopTriggerType,
} from '../../graphql/index'
import { Exchange } from 'types/exchange'
import { OrderSide, OrderType, StopTriggerType, StopOrderType } from 'types/order'

/* eslint-enable */

export interface CreateOrderSetResponse {
  orderSetId?: string
  error?: string
}

export interface CreateOrderSetInput {
  groupId: string
  exchange: Exchange
  symbol: string
  price?: number
  percent: number
  leverage: number
  side: OrderSide
  orderType: OrderType
  closeOrderSet: boolean
  stopPrice?: number
  description?: string
  exchangeAccountIds: string[]
  trailingStopPercent?: number
  stopTriggerType?: StopTriggerType
}

export interface CancelOrderResponse {
  success: boolean
  error?: string
}

export interface CancelOrderInput {
  orderId: string
}

export interface CancelOrderSetInput {
  orderSetId: string
  stopOrderTypes?: StopOrderType[]
}

export interface CancelOrderSetResponse {
  success: boolean
  error?: string
}

export const createOrderSet = async (
  input: CreateOrderSetInput,
): Promise<CreateOrderSetResponse> => {
  const { orderType, side, exchange, stopTriggerType, ...rest } = input
  const payload: RemoteCreateOrderSetInput = {
    side: convertOrderSide(side),
    exchange: convertExchange(exchange),
    orderType: convertOrderType(orderType),
    stopTriggerType: convertStopTriggerType(stopTriggerType),
    ...rest,
  }

  try {
    const { data } = await client.mutate({
      mutation: CreateOrderSetDocument,
      variables: {
        input: payload,
      },
    })

    if (!data) {
      return { error: 'Unable to create orders' }
    }

    return { orderSetId: data.createOrderSet.orderSet.id }
  } catch (error) {
    return { error: error.message }
  }
}

export const cancelOrder = async (input: CancelOrderInput): Promise<CancelOrderResponse> => {
  const { orderId } = input

  try {
    const {
      data: { success, error },
    } = await client.mutate({
      mutation: CancelOrderDocument,
      variables: {
        input: { id: orderId },
      },
    })

    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const cancelOrderSet = async (
  input: CancelOrderSetInput,
): Promise<CancelOrderSetResponse> => {
  const { orderSetId, stopOrderTypes } = input

  try {
    const {
      data: {
        cancelOrderSet: { success, error },
      },
    } = await client.mutate({
      mutation: CancelOrderSetDocument,
      variables: {
        input: {
          orderSetId,
          stopOrderTypes,
        },
      },
    })
    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function convertExchange(exchange: Exchange): RemoteExchange {
  switch (exchange) {
    case Exchange.BITMEX:
    default:
      return RemoteExchange.Bitmex
  }
}

function convertOrderSide(side: OrderSide): RemoteOrderSide {
  switch (side) {
    case OrderSide.BUY:
      return RemoteOrderSide.Buy
    case OrderSide.SELL:
    default:
      return RemoteOrderSide.Sell
  }
}

function convertOrderType(orderType: OrderType): RemoteOrderType {
  switch (orderType) {
    case OrderType.LIMIT:
      return RemoteOrderType.Limit
    case OrderType.MARKET:
    default:
      return RemoteOrderType.Market
  }
}

function convertStopTriggerType(stopTriggerType?: StopTriggerType): RemoteStopTriggerType | null {
  switch (stopTriggerType) {
    case StopTriggerType.LAST_PRICE:
      return RemoteStopTriggerType.LastPrice
    case StopTriggerType.MARK_PRICE:
      return RemoteStopTriggerType.MarkPrice
    default:
      break
  }
  return null
}
