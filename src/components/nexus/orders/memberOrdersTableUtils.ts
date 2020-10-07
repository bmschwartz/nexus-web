import { GetMemberOrdersQuery } from 'graphql'
import { convertToLocalExchange, Exchange } from 'types/exchange'
import {
  convertToLocalOrderSide,
  convertToLocalOrderStatus,
  convertToLocalOrderType,
  OrderSide,
  OrderStatus,
  OrderType,
} from 'types/order'

export interface OrdersTableItem {
  id: string
  exchange: Exchange
  symbol: string
  side: OrderSide
  orderType: OrderType
  price?: string
  status: OrderStatus
  date: string
}

export const createOrderTableData = (
  ordersResponse: GetMemberOrdersQuery | undefined,
): OrdersTableItem[] => {
  if (!ordersResponse?.membership) {
    return []
  }

  const {
    orders: { orders },
  } = ordersResponse.membership

  const ordersTableItems: OrdersTableItem[] = orders.map(order => {
    const { id, symbol, price, exchange, side, orderType, createdAt, status } = order
    return {
      id,
      price: String(price) ?? '',
      symbol,
      exchange: convertToLocalExchange(exchange),
      side: convertToLocalOrderSide(side),
      status: convertToLocalOrderStatus(status),
      orderType: convertToLocalOrderType(orderType),
      date: createdAt,
    }
  })

  return ordersTableItems
}
