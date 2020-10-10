import { convertToLocalExchange, Exchange } from 'types/exchange'
import { convertToLocalPositionSide, PositionSide } from 'types/position'

/* eslint-disable */
import { GetGroupPositionsQuery } from '../../../graphql'
import { displayTimeBeforeNow } from '../dateUtil'
/* eslint-enable */

export interface PositionTableItem {
  id: string
  exchange: Exchange
  symbol: string
  side: PositionSide
  quantity: string
  avgPrice: string
  updated: string
}

export const createPositionTableData = (
  positionResponse: GetGroupPositionsQuery | undefined,
): PositionTableItem[] => {
  if (!positionResponse?.group) {
    return []
  }

  const {
    positions: { positions },
  } = positionResponse.group

  const positionTableItems: PositionTableItem[] = positions.map(position => {
    const { id, symbol, avgPrice, quantity, exchange, side, updatedAt } = position
    return {
      id,
      symbol,
      quantity: String(quantity) ?? '',
      avgPrice: String(avgPrice) ?? '',
      exchange: convertToLocalExchange(exchange),
      side: convertToLocalPositionSide(side),
      updated: displayTimeBeforeNow(updatedAt),
    }
  })

  return positionTableItems
}
