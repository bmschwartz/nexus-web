import { Exchange, ExchangeAccount } from 'types/exchange'

export interface ExchangeAccountTableItem {
  id: string
  active: boolean
  exchange: Exchange
  orderCount: number
}

export const createExchangeAccountTableData = (
  exchangeAccounts: ExchangeAccount[],
): ExchangeAccountTableItem[] => {
  const exchangeAccountTableItems: ExchangeAccountTableItem[] = exchangeAccounts.map(
    exchangeAccount => {
      const { id, active, exchange, orders } = exchangeAccount
      return {
        id,
        active,
        exchange,
        orderCount: orders.length,
      }
    },
  )

  return exchangeAccountTableItems
}
