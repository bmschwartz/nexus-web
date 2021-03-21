/* eslint-disable */
import { client } from './client'
import {
  GroupExistsDocument,
  CreateGroupDocument,
  DeleteMembershipDocument,
  CreateGroupMembershipDocument,
  GetUserIdByEmailDocument,
  MembershipRole,
  MembershipStatus,
  UpdateGroupDescriptionDocument,
} from '../../graphql/index'
/* eslint-enable */

export interface CreateGroupResponse {
  groupId?: string
  error?: string
}

export interface GroupExistsResponse {
  exists: boolean
  error: string | null
}

export interface GroupSubscriptionOption {
  fee: number
  duration: number
  description?: string
}

export interface CreateGroupInput {
  name: string
  description: string
  payInPlatform: boolean
  telegram?: string
  discord?: string
  email?: string
  payoutAddress?: string
  subscriptionOptions: GroupSubscriptionOption[]
}

export interface InviteMemberInput {
  groupId: string
  email: string
}

export interface InviteMemberResponse {
  membershipId?: string
  error?: string
}

export interface RemoveMemberInput {
  groupId: string
  membershipId: string
}

export interface RemoveMemberResponse {
  success: boolean
  error?: string
}

export interface UpdateGroupDescriptionInput {
  groupId: string
  description: string
}

export interface UpdateGroupDescriptionResponse {
  success: boolean
  error?: string
}

export const createGroup = async (input: CreateGroupInput): Promise<CreateGroupResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: CreateGroupDocument,
      variables: {
        input,
      },
    })

    if (!data) {
      return { error: 'Unable to create the group' }
    }

    return { groupId: data.createGroup.id }
  } catch (error) {
    return { error: error.message }
  }
}

export const groupExists = async (name: string): Promise<GroupExistsResponse> => {
  const result: GroupExistsResponse = {
    exists: false,
    error: null,
  }

  try {
    const response = await client.query({
      query: GroupExistsDocument,
      variables: { input: { name } },
    })
    const { data } = response
    result.exists = data ? data.groupExists : false
  } catch (error) {
    result.error = error.message
  }

  return result
}

export const inviteMember = async ({
  groupId,
  email,
}: InviteMemberInput): Promise<InviteMemberResponse> => {
  try {
    const { data: getUserData } = await client.query({
      query: GetUserIdByEmailDocument,
      variables: { input: { email } },
      fetchPolicy: 'network-only',
    })

    if (!getUserData || !getUserData.userIdByEmail) {
      return { error: 'Unable to invite user' }
    }

    const memberId = getUserData.userIdByEmail

    const { data: inviteResponse } = await client.mutate({
      mutation: CreateGroupMembershipDocument,
      variables: {
        input: {
          groupId,
          memberId,
          role: MembershipRole.Member,
          status: MembershipStatus.Approved,
        },
      },
    })

    if (!inviteResponse) {
      return { error: 'Unable to invite user' }
    }

    return inviteResponse.createMembership
  } catch (e) {
    return { error: e.message }
  }
}

export const removeMember = async ({
  groupId,
  membershipId,
}: RemoveMemberInput): Promise<RemoveMemberResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: DeleteMembershipDocument,
      variables: { input: { groupId, membershipId } },
    })

    if (!data) {
      return { success: false, error: 'Unable to remove member' }
    }

    const { success, error } = data.deleteMembership
    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateGroupDescription = async ({
  groupId,
  description,
}: UpdateGroupDescriptionInput): Promise<UpdateGroupDescriptionResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: UpdateGroupDescriptionDocument,
      variables: { input: { groupId, description } },
    })

    if (!data) {
      return { success: false, error: 'Unable to update profile' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
