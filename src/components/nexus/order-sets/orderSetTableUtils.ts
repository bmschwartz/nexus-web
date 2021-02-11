import { convertToLocalExchange, Exchange } from 'types/exchange'
import { convertToLocalOrderSide, convertToLocalOrderType, OrderSide, OrderType } from 'types/order'

/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
import { GetGroupOrderSetsQuery, OrderType as RemoteOrderType } from '../../../graphql'

/* eslint-enable */

export interface OrderSetTableItem {
  id: string
  exchange: Exchange
  symbol: string
  side: OrderSide
  orderType: OrderType
  closeOrderSet: boolean
  price: string
  date: string
}

export const createOrderSetTableData = (
  orderSetResponse: GetGroupOrderSetsQuery | undefined,
): OrderSetTableItem[] => {
  if (!orderSetResponse?.group) {
    return []
  }

  const {
    orderSets: { orderSets },
  } = orderSetResponse.group

  const orderSetTableItems: OrderSetTableItem[] = orderSets.map(orderSet => {
    const { id, symbol, price, exchange, side, orderType, closeOrderSet, createdAt } = orderSet
    const displayPrice = orderType === RemoteOrderType.Market ? 'Market' : String(price) ?? ''
    return {
      id,
      price: displayPrice,
      symbol,
      closeOrderSet,
      exchange: convertToLocalExchange(exchange),
      side: convertToLocalOrderSide(side),
      orderType: convertToLocalOrderType(orderType),
      date: displayTimeBeforeNow(createdAt),
    }
  })

  return orderSetTableItems
}
