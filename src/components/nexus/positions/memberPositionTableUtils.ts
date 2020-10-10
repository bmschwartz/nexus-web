import { GetMemberPositionsQuery } from '../../../graphql'
import { convertToLocalExchange, Exchange } from 'types/exchange'
import {
  convertToLocalPositionSide,
  convertToLocalPositionStatus,
  convertToLocalPositionType,
  PositionSide,
} from 'types/position'

/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
/* eslint-enable */

export interface PositionsTableItem {
  id: string
  exchange: Exchange
  symbol: string
  quantity: number
  side: PositionSide
  avgPrice: string
  updated: string
}

export const createPositionTableData = (
  positionsResponse: GetMemberPositionsQuery | undefined,
): PositionsTableItem[] => {
  if (!positionsResponse?.membership) {
    return []
  }

  const {
    positions: { positions },
  } = positionsResponse.membership

  const positionsTableItems: PositionsTableItem[] = positions.map(position => {
    const { id, symbol, avgPrice, exchange, side, quantity, updatedAt } = position
    return {
      id,
      symbol,
      quantity,
      avgPrice: String(avgPrice) ?? '',
      exchange: convertToLocalExchange(exchange),
      side: convertToLocalPositionSide(side),
      updated: displayTimeBeforeNow(updatedAt),
    }
  })

  return positionsTableItems
}
