import { Exchange } from 'types/exchange'

/* eslint-disable */
import { client } from './client'
import {
  Exchange as RemoteExchange,
  CreateExchangeAccountDocument,
  CreateExchangeAccountInput as RemoteCreateExchangeAccountInput,
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
