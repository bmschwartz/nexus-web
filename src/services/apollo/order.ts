/* eslint-disable */
import { client } from './client'
import {
  CancelOrderDocument,
  CreateOrderSetDocument,
  CreateOrderSetInput as RemoteCreateOrderSetInput,
  OrderType as RemoteOrderType,
  OrderSide as RemoteOrderSide,
  Exchange as RemoteExchange,
} from '../../graphql/index'
import { Exchange } from 'types/exchange'
import { OrderSide, OrderType } from 'types/order'
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
}

export interface CancelOrderResponse {
  success: boolean
  error?: string
}

export interface CancelOrderInput {
  orderId: string
}

export const createOrderSet = async (
  input: CreateOrderSetInput,
): Promise<CreateOrderSetResponse> => {
  const { orderType, side, exchange, ...rest } = input
  const payload: RemoteCreateOrderSetInput = {
    side: convertOrderSide(side),
    exchange: convertExchange(exchange),
    orderType: convertOrderType(orderType),
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
      return { error: 'Unable to create the order set' }
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

function convertExchange(exchange: Exchange): RemoteExchange {
  switch (exchange) {
    case Exchange.BINANCE:
      return RemoteExchange.Binance
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
