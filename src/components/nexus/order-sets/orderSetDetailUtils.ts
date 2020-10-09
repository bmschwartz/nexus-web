import { convertToLocalOrderStatus } from 'types/order'

export const OrdersTableColumns = [
  {
    id: 'username',
    title: 'Username',
    dataIndex: 'username',
  },
  {
    id: 'price',
    title: 'Price',
    dataIndex: 'price',
  },
  {
    id: 'quantity',
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    id: 'filledQty',
    title: 'Filled',
    dataIndex: 'filledQty',
  },
  {
    id: 'status',
    title: 'Status',
    dataIndex: 'status',
  },
  {
    id: 'updatedAt',
    title: 'Updated',
    dataIndex: 'updatedAt',
  },
]

export interface OrderTableRow {
  id: string
  username: string
  status: string
  price?: string
  quantity?: string
  filledQty?: string
  updatedAt?: string
}

export function transformOrdersData(ordersData: any[]): OrderTableRow[] {
  return ordersData.map(order => {
    const { id, price, status, quantity, filledQty, updatedAt } = order
    return {
      id,
      price,
      quantity,
      filledQty,
      updatedAt,
      status: convertToLocalOrderStatus(status),
      username: order.exchangeAccount.membership.member.username,
    }
  })
}
