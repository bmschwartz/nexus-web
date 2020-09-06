/* eslint-disable */
import { client } from './client'
import { GroupExistsDocument, CreateGroupDocument } from '../../graphql/index'
/* eslint-enable */

interface CreateGroupResponse {
  groupId?: string
  error?: string
}

interface GroupExistsResponse {
  exists: boolean
  error: string | null
}

export const createGroup = async (
  name: string,
  description: string,
  membershipLength: number,
  membershipFee: number,
  payInPlatform: boolean,
  telegram?: string,
  discord?: string,
  email?: string,
  payoutCurrency?: string,
  payoutAddress?: string,
): Promise<CreateGroupResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: CreateGroupDocument,
      variables: {
        input: {
          name,
          description,
          membershipLength,
          membershipFee,
          payInPlatform,
          telegram,
          discord,
          email,
          payoutCurrency,
          payoutAddress,
        },
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
