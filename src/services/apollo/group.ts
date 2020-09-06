/* eslint-disable */
import { client } from './client'
import { GroupExistsDocument, CreateGroupDocument } from '../../graphql/index'
import { Group } from 'types/group'
import { Membership, statusFromString, roleFromString } from 'types/membership'
/* eslint-enable */

interface CreateGroupResponse {
  group?: Group
  error?: string
}

interface GroupExistsResponse {
  exists: boolean
  error: string | null
}

export const createGroup = async (
  name: string,
  description: string,
): Promise<CreateGroupResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: CreateGroupDocument,
      variables: { input: { name, description } },
    })

    if (!data) {
      return { error: 'Unable to create the group' }
    }

    const { id: groupId, active, memberships: groupMemberships } = data.createGroup
    const memberships: Membership[] = groupMemberships.map((membership: any) => ({
      id: membership.id,
      groupId,
      memberId: 1,
      active: membership.active,
      status: statusFromString(membership.status),
      role: roleFromString(membership.role),
      orders: [],
    }))

    return {
      group: {
        id: groupId,
        name,
        active,
        description,
        memberships,
      },
    }
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
