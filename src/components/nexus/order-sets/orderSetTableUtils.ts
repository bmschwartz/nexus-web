import { GetGroupOrderSetsQuery } from 'graphql'
import { convertToLocalExchange, Exchange } from 'types/exchange'
import { convertToLocalOrderSide, convertToLocalOrderType, OrderSide, OrderType } from 'types/order'

export interface OrderSetTableRow {
  id: String
  exchange: String
  symbol: String
  side: OrderSide
  orderType: OrderType
  price: String
  date: String
}

export const OrderSetTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Side',
    dataIndex: 'side',
    key: 'side',
  },
  {
    title: 'Type',
    dataIndex: 'orderType',
    key: 'orderType',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
]

export interface OrderSetTableItem {
  id: string
  exchange: Exchange
  symbol: string
  side: OrderSide
  orderType: OrderType
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
    const { id, symbol, price, exchange, side, orderType, createdAt } = orderSet
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

  return orderSetTableItems
}
