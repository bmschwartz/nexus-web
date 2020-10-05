import { Exchange } from 'types/exchange'

/* eslint-disable */
import { client } from './client'
import {
  Exchange as RemoteExchange,
  CreateExchangeAccountDocument,
  CreateExchangeAccountInput as RemoteCreateExchangeAccountInput,
  DeleteExchangeAccountDocument,
} from '../../graphql/index'
/* eslint-enable */

export interface CreateExchangeAccountResponse {
  error?: string
  exchangeAccountId?: string
}

export interface CreateExchangeAccountInput {
  exchange: Exchange
  membershipId: string
  apiKey: string
  apiSecret: string
}

export interface DeleteExchangeAccountResponse {
  success: boolean
  error?: string
}

export interface DeleteExchangeAccountInput {
  accountId: string
}

export const deleteExchangeAccount = async (
  input: DeleteExchangeAccountInput,
): Promise<DeleteExchangeAccountResponse> => {
  const { accountId } = input
  console.log(`deleting account ${accountId}`)
  try {
    const { data } = await client.mutate({
      mutation: DeleteExchangeAccountDocument,
      variables: {
        input: { id: accountId },
      },
    })

    if (!data) {
      return { error: 'Unable to delete the exchange account', success: false }
    }

    return { success: true }
  } catch (error) {
    return { error: error.message, success: false }
  }
}

export const createExchangeAccount = async (
  input: CreateExchangeAccountInput,
): Promise<CreateExchangeAccountResponse> => {
  const { exchange, ...rest } = input
  const payload: RemoteCreateExchangeAccountInput = {
    exchange: convertExchange(exchange),
    ...rest,
  }

  try {
    const { data } = await client.mutate({
      mutation: CreateExchangeAccountDocument,
      variables: {
        input: payload,
      },
    })

    if (!data) {
      return { error: 'Unable to create the exchange account' }
    }

    return { exchangeAccountId: data.createExchangeAccount.id }
  } catch (error) {
    return { error: error.message }
  }
}

function convertExchange(exchange: Exchange): RemoteExchange {
  switch (exchange) {
    case Exchange.BINANCE:
      return RemoteExchange.Binance
    case Exchange.BITMEX:
    default:
      return RemoteExchange.Bitmex
  }
}
