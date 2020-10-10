/* eslint-disable */
import { PositionSide as RemotePositionSide } from '../graphql'
import { Exchange } from './exchange'
/* eslint-enable */

export enum PositionSide {
  LONG = 'Long',
  SHORT = 'Short',
}

export interface Position {
  id: string
  side: PositionSide
  exchange: Exchange
  avgPrice?: number
  quantity?: number
  symbol: string
  updatedAt: string
}

export function convertToLocalPositionSide(side: RemotePositionSide): PositionSide {
  switch (side) {
    case RemotePositionSide.Long:
      return PositionSide.LONG
    case RemotePositionSide.Short:
    default:
      return PositionSide.SHORT
  }
}
