/* eslint-disable */
import { client } from './client'
import {
  ActivateMemberSubscriptionDocument,
  CancelMemberSubscriptionDocument,
  PayMemberSubscriptionDocument,
} from '../../graphql/index'
/* eslint-enable */

export interface ActivateMemberSubscriptionInput {
  subscriptionId: string
}

export interface ActivateMemberSubscriptionResponse {
  success: boolean
  error?: string
}

export interface CancelMemberSubscriptionInput {
  subscriptionId: string
}

export interface CancelMemberSubscriptionResponse {
  success: boolean
  error?: string
}

export interface PayMemberSubscriptionInput {
  groupId: string
  membershipId: string
}

export interface PayMemberSubscriptionResponse {
  invoiceId?: string
  error?: string
}

export const activateMemberSubscription = async (
  input: ActivateMemberSubscriptionInput,
): Promise<ActivateMemberSubscriptionResponse> => {
  const { subscriptionId } = input
  try {
    const { data } = await client.mutate({
      mutation: ActivateMemberSubscriptionDocument,
      variables: {
        input: { subscriptionId },
      },
    })

    if (!data) {
      return { success: false, error: 'Error activating subscription' }
    }

    const { success, error } = data

    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const cancelMemberSubscription = async (
  input: CancelMemberSubscriptionInput,
): Promise<CancelMemberSubscriptionResponse> => {
  const { subscriptionId } = input
  try {
    const { data } = await client.mutate({
      mutation: CancelMemberSubscriptionDocument,
      variables: {
        input: { subscriptionId },
      },
    })

    if (!data) {
      return { success: false, error: 'Error canceling subscription' }
    }

    const { success, error } = data

    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const payMemberSubscription = async (
  input: PayMemberSubscriptionInput,
): Promise<PayMemberSubscriptionResponse> => {
  const { membershipId, groupId } = input
  try {
    const { data } = await client.mutate({
      mutation: PayMemberSubscriptionDocument,
      variables: {
        input: { membershipId, groupId },
      },
    })

    if (!data) {
      return { error: 'Error paying subscription' }
    }

    const {
      payMemberSubscription: { invoiceId, error },
    } = data

    return { invoiceId, error }
  } catch (error) {
    return { error: error.message }
  }
}
