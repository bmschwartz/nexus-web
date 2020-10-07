import { GetMemberOrdersQuery } from 'graphql'
import { Exchange } from 'types/exchange'
import { OrderSide, OrderType } from 'types/order'

export interface OrdersTableItem {
  id: string
  exchange: Exchange
  symbol: string
  side: OrderSide
  orderType: OrderType
  price?: string
  quantity?: number
  filled?: number
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
    const { id, symbol, price, exchange, side, orderType, createdAt } = order
    return {
      id,
      price: String(price) ?? '',
      symbol,
      exchange: convertToLocalExchange(exchange),
      side: convertToLocalOrderSide(side),
      orderType: convertToLocalOrderType(orderType),
      date: createdAt,
    }
  })

  return ordersTableItems
}
