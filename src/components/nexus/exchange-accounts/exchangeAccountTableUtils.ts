import { convertToLocalExchange, Exchange } from 'types/exchange'

export interface ExchangeAccountTableItem {
  id: string
  active: boolean
  exchange: Exchange
  orderCount: number
}

export const createExchangeAccountTableData = (
  exchangeAccounts?: any[],
): ExchangeAccountTableItem[] => {
  if (!exchangeAccounts) {
    return []
  }

  const exchangeAccountTableItems: ExchangeAccountTableItem[] = exchangeAccounts.map(
    (exchangeAccount: any) => {
      const { id, active, exchange, orders } = exchangeAccount
      return {
        id,
        active,
        exchange: convertToLocalExchange(exchange),
        orderCount: orders.length,
      }
    },
  )

  return exchangeAccountTableItems
}
