import { convertToLocalExchange, Exchange } from 'types/exchange'

/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
/* eslint-enable */

export interface ExchangeAccountTableItem {
  id: string
  active: boolean
  exchange: Exchange
  orderCount: number
  createdAt: string
}

export const createExchangeAccountTableData = (
  exchangeAccounts?: any[],
): ExchangeAccountTableItem[] => {
  if (!exchangeAccounts) {
    return []
  }

  const exchangeAccountTableItems: ExchangeAccountTableItem[] = exchangeAccounts.map(
    (exchangeAccount: any) => {
      const { id, active, exchange, orders, createdAt } = exchangeAccount
      return {
        id,
        active,
        createdAt: displayTimeBeforeNow(createdAt),
        exchange: convertToLocalExchange(exchange),
        orderCount: orders.length,
      }
    },
  )

  return exchangeAccountTableItems
}
