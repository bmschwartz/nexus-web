/* eslint-disable */
import { client } from './client'
import {
  ActivateMemberSubscriptionDocument,
  CancelMemberSubscriptionDocument,
  CreateGroupSubscriptionDocument,
  DeleteGroupSubscriptionDocument,
  PayMemberSubscriptionDocument,
  ToggleSubscriptionActiveDocument,
  UpdateGroupSubscriptionDocument,
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

export interface CreateGroupSubscriptionInput {
  fee: number
  duration: number
  description?: string
}

export interface CreateGroupSubscriptionResponse {
  success: boolean
  error?: string
}

export interface UpdateGroupSubscriptionInput {
  fee: number
  description?: string
  subscriptionId: string
}

export interface UpdateGroupSubscriptionResponse {
  success: boolean
  error?: string
}

export interface DeleteGroupSubscriptionInput {
  subscriptionId: string
}

export interface DeleteGroupSubscriptionResponse {
  success: boolean
  error?: string
}

export interface ToggleSubscriptionActiveInput {
  subscriptionId: string
}

export interface ToggleSubscriptionActiveResponse {
  success: boolean
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

export const createGroupSubscription = async (
  input: CreateGroupSubscriptionInput,
): Promise<CreateGroupSubscriptionResponse> => {
  const { fee, duration, description } = input
  try {
    const { data } = await client.mutate({
      mutation: CreateGroupSubscriptionDocument,
      variables: {
        input: { fee, duration, description },
      },
    })

    if (!data) {
      return { success: false, error: 'Error creating subscription option' }
    }

    const {
      createGroupSubscription: { success, error },
    } = data

    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateGroupSubscription = async (
  input: UpdateGroupSubscriptionInput,
): Promise<UpdateGroupSubscriptionResponse> => {
  const { fee, description, subscriptionId } = input
  try {
    const { data } = await client.mutate({
      mutation: UpdateGroupSubscriptionDocument,
      variables: {
        input: { fee, description, subscriptionId },
      },
    })

    if (!data) {
      return { success: false, error: 'Error updating subscription option' }
    }

    const {
      updateGroupSubscription: { success, error },
    } = data

    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const deleteGroupSubscription = async (
  input: DeleteGroupSubscriptionInput,
): Promise<DeleteGroupSubscriptionResponse> => {
  const { subscriptionId } = input
  try {
    const { data } = await client.mutate({
      mutation: DeleteGroupSubscriptionDocument,
      variables: {
        input: { subscriptionId },
      },
    })

    if (!data) {
      return { success: false, error: 'Error deleting subscription option' }
    }

    const {
      deleteGroupSubscription: { success, error },
    } = data

    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const toggleSubscriptionActive = async (
  input: ToggleSubscriptionActiveInput,
): Promise<ToggleSubscriptionActiveResponse> => {
  const { subscriptionId } = input
  try {
    const { data } = await client.mutate({
      mutation: ToggleSubscriptionActiveDocument,
      variables: {
        input: { subscriptionId },
      },
    })

    if (!data) {
      return { success: false, error: 'Error toggling subscription option active' }
    }

    const {
      toggleSubscriptionActive: { success, error },
    } = data

    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
