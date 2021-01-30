import * as Yup from 'yup'

/* Local */
import { convertToLocalPositionSide, Position, PositionSide } from 'types/position'
import { OrderType } from 'types/order'
import { TransferItem } from 'antd/lib/transfer'
import { GetGroupPositionsQuery } from 'graphql'
import { convertToLocalExchange, convertToRemoteExchange, Exchange } from 'types/exchange'

interface MemberPosition {
  position: Position
  username: string
  exchangeAccountId: string
}

export const getClosePositionsSchema = () => {
  return Yup.object().shape({
    side: Yup.string()
      .label('Side')
      .oneOf(Object.values(PositionSide))
      .required(),
    orderType: Yup.string()
      .label('Type')
      .oneOf(Object.values(OrderType))
      .required(),
    price: Yup.number()
      .label('Price')
      .when('type', {
        is: OrderType.LIMIT,
        then: Yup.number()
          .positive()
          .required(),
        otherwise: Yup.number()
          .nullable()
          .notRequired(),
      }),
    percent: Yup.number()
      .label('Balance Percent')
      .positive()
      .integer()
      .max(100)
      .required(),
    description: Yup.string()
      .label('Description')
      .max(500)
      .optional(),
    exchangeAccountIds: Yup.array().label('Members'),
  })
}

export const createTransferData = (
  desiredSide: PositionSide,
  memberPositions: MemberPosition[],
): TransferItem[] => {
  return memberPositions
    .filter(memberPosition => memberPosition.position.side === desiredSide)
    .map((memberPosition: MemberPosition) => {
      return {
        key: memberPosition.exchangeAccountId,
        title: memberPosition.username,
      }
    })
}

export const extractMemberPositions = (
  targetExchange: Exchange,
  groupPositions: GetGroupPositionsQuery | undefined,
): MemberPosition[] => {
  if (!groupPositions || !groupPositions.group) {
    return []
  }

  const { memberships } = groupPositions.group

  const memberPositions = memberships
    .map(membership => {
      const {
        member: { username },
        positions: { positions },
      } = membership

      const remotePositions: any = positions.filter(
        position => position.exchange === convertToRemoteExchange(targetExchange),
      )
      if (!Array.isArray(remotePositions) || remotePositions.length === 0) {
        return
      }

      const remotePosition = remotePositions[0]

      const {
        id,
        side,
        avgPrice,
        quantity,
        updatedAt,
        symbol,
        exchange,
        exchangeAccount: { id: exchangeAccountId },
      } = remotePosition
      const position: Position = {
        id,
        avgPrice: avgPrice || undefined,
        quantity: quantity || undefined,
        updatedAt,
        symbol,
        exchange: convertToLocalExchange(exchange),
        side: convertToLocalPositionSide(side),
      }

      const memberPosition: MemberPosition = {
        username,
        position,
        exchangeAccountId,
      }
      // eslint-disable-next-line consistent-return
      return memberPosition
    })
    .filter(Boolean)

  return memberPositions as MemberPosition[]
}
