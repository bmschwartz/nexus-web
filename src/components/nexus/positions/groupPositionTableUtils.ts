import { convertToLocalPositionSide, PositionSide } from 'types/position'

/* eslint-disable */
import { GetGroupPositionsQuery } from '../../../graphql'
import { displayTimeBeforeNow } from '../dateUtil'
/* eslint-enable */

export interface PositionTableItem {
  id: string
  symbol: string
  side: PositionSide
  leverage: string
  quantity: string
  avgPrice: string
  updated: string
}

export const createPositionTableData = (
  positionResponse: GetGroupPositionsQuery | undefined,
  desiredSide: PositionSide,
): PositionTableItem[] => {
  if (!positionResponse?.group || !positionResponse.group.members) {
    return []
  }

  const { members } = positionResponse.group.members
  const positions = members.flatMap(membership => {
    const {
      member: { username },
    } = membership
    return membership.positions.positions.map(position => ({ ...position, username }))
  })

  return positions
    .filter(position => {
      const sidesMatch = convertToLocalPositionSide(position.side) === desiredSide
      return sidesMatch && position.isOpen
    })
    .map(position => {
      const { id, symbol, avgPrice, quantity, leverage, side, updatedAt, username } = position
      return {
        id,
        symbol,
        username,
        leverage: String(leverage) ?? '',
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
