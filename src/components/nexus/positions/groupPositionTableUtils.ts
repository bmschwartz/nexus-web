import { convertToLocalPositionSide, PositionSide } from 'types/position'

/* eslint-disable */
import { GetGroupPositionsQuery } from '../../../graphql'
import { displayTimeBeforeNow } from '../dateUtil'
// import { displayTimeBeforeNow } from '../dateUtil'
/* eslint-enable */

export interface PositionTableItem {
  id: string
  symbol: string
  side: PositionSide
  quantity: string
  avgPrice: string
  updated: string
}

export const createPositionTableData = (
  positionResponse: GetGroupPositionsQuery | undefined,
  desiredSide: PositionSide,
): PositionTableItem[] => {
  if (!positionResponse?.group) {
    return []
  }

  const { memberships } = positionResponse.group
  const positions = memberships.flatMap(membership => membership.positions.positions)

  return positions
    .filter(position => {
      const sidesMatch = convertToLocalPositionSide(position.side) === desiredSide
      return sidesMatch && position.isOpen
    })
    .map(position => {
      const { id, symbol, avgPrice, quantity, side, updatedAt } = position
      return {
        id,
        symbol,
        quantity: String(quantity) ?? '',
        avgPrice: String(avgPrice) ?? '',
        side: convertToLocalPositionSide(side),
        updated: displayTimeBeforeNow(updatedAt),
      }
    })
}

export interface FilterDropdown {
  setSelectedKeys: (input: string | object) => void
  selectedKeys: () => void
  confirm: () => void
  clearFilters: () => void
}
