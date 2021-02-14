import { convertToLocalExchange, Exchange } from 'types/exchange'
import { convertToLocalPositionSide, PositionSide } from 'types/position'

/* eslint-disable */
import { GetMemberPositionsQuery } from '../../../graphql'
import { displayTimeBeforeNow } from '../dateUtil'
/* eslint-enable */

export interface PositionsTableItem {
  id: string
  exchange: Exchange
  symbol: string
  leverage: string
  side: PositionSide
  updated: string
  quantity: string
  avgPrice: string
  isOpen: string
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

  return positions
    .filter(position => position.isOpen)
    .map(position => {
      const {
        id,
        symbol,
        avgPrice,
        leverage,
        exchange,
        side,
        quantity,
        updatedAt,
        isOpen,
      } = position
      return {
        id,
        symbol,
        leverage: leverage ? String(leverage) : '',
        isOpen: isOpen ? 'Yes' : 'No',
        quantity: quantity ? String(quantity) : '',
        avgPrice: avgPrice ? String(avgPrice) : '',
        exchange: convertToLocalExchange(exchange),
        side: convertToLocalPositionSide(side),
        updated: displayTimeBeforeNow(updatedAt),
      }
    })
}
