import { Exchange } from 'types/exchange'

/* eslint-disable */
import { client } from './client'
import {
  Exchange as RemoteExchange,
  CreateExchangeAccountDocument,
  UpdateExchangeAccountDocument,
  CreateExchangeAccountInput as RemoteCreateExchangeAccountInput,
  UpdateExchangeAccountInput as RemoteUpdateExchangeAccountInput,
  DeleteExchangeAccountDocument,
  ToggleExchangeAccountActiveDocument,
} from '../../graphql/index'
/* eslint-enable */

export interface CreateExchangeAccountResponse {
  error?: string
  operationId?: string
}

export interface CreateExchangeAccountInput {
  exchange: Exchange
  membershipId: string
  apiKey: string
  apiSecret: string
}

export interface UpdateExchangeAccountResponse {
  error?: string
  operationId?: string
}

export interface UpdateExchangeAccountInput {
  id: string
  apiKey: string
  apiSecret: string
}

export interface DeleteExchangeAccountResponse {
  error?: string
  operationId?: string
}

export interface DeleteExchangeAccountInput {
  accountId: string
}

export interface ToggleExchangeAccountResponse {
  operationId?: string
  error?: string
}

export interface ToggleExchangeAccountInput {
  active: boolean
  accountId: string
}

export const deleteExchangeAccount = async (
  input: DeleteExchangeAccountInput,
): Promise<DeleteExchangeAccountResponse> => {
  const { accountId } = input
  try {
    const { data } = await client.mutate({
      mutation: DeleteExchangeAccountDocument,
      variables: {
        input: { id: accountId },
      },
    })

    if (!data) {
      return { error: 'Unable to delete the exchange account' }
    }

    const {
      deleteExchangeAccount: { operationId, error },
    } = data

    return { operationId, error }
  } catch (error) {
    return { error: error.message }
  }
}

export const toggleExchangeAccountActive = async (
  input: ToggleExchangeAccountInput,
): Promise<ToggleExchangeAccountResponse> => {
  const { accountId, active } = input
  try {
    const { data } = await client.mutate({
      mutation: ToggleExchangeAccountActiveDocument,
      variables: {
        input: { id: accountId },
      },
    })

    if (!data) {
      return { error: `Unable to ${active ? 'disable' : 'enable'} the account` }
    }

    const {
      toggleExchangeAccountActive: { operationId, error },
    } = data

    return { operationId, error }
  } catch (error) {
    return { error: error.message }
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
      return { error: 'Unable to create exchange account' }
    }

    const {
      createExchangeAccount: { operationId, error },
    } = data

    return { operationId, error }
  } catch (error) {
    return { error: error.message }
  }
}

export const updateExchangeAccount = async (
  input: UpdateExchangeAccountInput,
): Promise<UpdateExchangeAccountResponse> => {
  const payload: RemoteUpdateExchangeAccountInput = {
    ...input,
  }

  try {
    const { data } = await client.mutate({
      mutation: UpdateExchangeAccountDocument,
      variables: {
        input: payload,
      },
    })

    if (!data) {
      return { error: 'Unable to update the exchange account' }
    }

    const {
      updateExchangeAccount: { operationId, error },
    } = data

    return { operationId, error }
  } catch (error) {
    return { error: error.message }
  }
}

function convertExchange(exchange: Exchange): RemoteExchange {
  switch (exchange) {
    case Exchange.BITMEX:
    default:
      return RemoteExchange.Bitmex
  }
}
