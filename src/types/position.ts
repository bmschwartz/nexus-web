/* eslint-disable */
import { PositionSide as RemotePositionSide, Position as RenotePosition } from '../graphql'
import { convertToLocalExchange, Exchange } from './exchange'
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

export function convertToLocalPosition(remotePosition: RenotePosition): Position {
  const { id, side, exchange, avgPrice, quantity, symbol, updatedAt } = remotePosition

  return {
    id,
    avgPrice: avgPrice || undefined,
    quantity: quantity || undefined,
    symbol,
    updatedAt,
    side: convertToLocalPositionSide(side),
    exchange: convertToLocalExchange(exchange),
  }
}
