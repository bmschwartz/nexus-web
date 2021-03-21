/* eslint-disable */
import { client } from './client'
import {
  JoinGroupDocument,
  MembershipRole,
  MembershipStatus,
  RequestGroupAccessDocument,
  UpdateMembershipRoleDocument,
  UpdateMembershipStatusDocument,
} from '../../graphql/index'
/* eslint-enable */

export interface RequestGroupAccessInput {
  groupId: string
}

export interface RequestGroupAccessResponse {
  success: boolean
  error?: string
}

export interface UpdateMembershipRoleInput {
  membershipId: string
  role: MembershipRole
  groupId: string
}

export interface UpdateMembershipRoleResponse {
  success: boolean
  error?: string
}

export interface UpdateMembershipStatusInput {
  membershipId: string
  status: MembershipStatus
  groupId: string
}

export interface UpdateMembershipStatusResponse {
  success: boolean
  error?: string
}

export interface JoinGroupInput {
  groupId: string
}

export interface JoinGroupResponse {
  membershipId?: string
  error?: string
}

export const joinGroup = async ({ groupId }: JoinGroupInput): Promise<JoinGroupResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: JoinGroupDocument,
      variables: {
        input: { groupId },
      },
    })

    if (!data) {
      return { error: 'Unable to Join Group' }
    }

    return data.joinGroup
  } catch (e) {
    return { error: e.message }
  }
}

export const updateMembershipRole = async ({
  membershipId,
  role,
  groupId,
}: UpdateMembershipRoleInput): Promise<UpdateMembershipRoleResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: UpdateMembershipRoleDocument,
      variables: {
        input: {
          membershipId,
          role,
          groupId,
        },
      },
    })

    if (!data) {
      return { success: false, error: 'Unable to change Role' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateMembershipStatus = async ({
  membershipId,
  groupId,
  status,
}: UpdateMembershipStatusInput): Promise<UpdateMembershipStatusResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: UpdateMembershipStatusDocument,
      variables: {
        input: {
          membershipId,
          status,
          groupId,
        },
      },
    })

    if (!data) {
      return { success: false, error: 'Unable to change member status' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const requestGroupAccess = async ({
  groupId,
}: RequestGroupAccessInput): Promise<RequestGroupAccessResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: RequestGroupAccessDocument,
      variables: {
        input: { groupId },
      },
    })

    if (!data) {
      return { success: false, error: 'Unable to request access' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
