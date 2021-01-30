/* eslint-disable */
import { client } from './client'
import {
  ClosePositionsDocument,
  ClosePositionsInput as RemoteClosePositionsInput,
} from '../../graphql/index'
/* eslint-enable */

export interface ClosePositionsInput {
  symbol: string
  price?: number
  fraction?: number
  exchangeAccountIds: string[]
}

export interface ClosePositionsResponse {
  operationId?: string
  error?: string
}

export const closePositions = async (
  input: ClosePositionsInput,
): Promise<ClosePositionsResponse> => {
  const { symbol, fraction, price, exchangeAccountIds } = input
  const payload: RemoteClosePositionsInput = {
    symbol,
    fraction,
    price,
    exchangeAccountIds,
  }

  try {
    const { data } = await client.mutate({
      mutation: ClosePositionsDocument,
      variables: {
        input: payload,
      },
    })

    if (!data) {
      return { error: 'Unable to close positions' }
    }

    const {
      closePositions: { operationId, error },
    } = data

    return { operationId, error }
  } catch (error) {
    return { error: error.message }
  }
}
