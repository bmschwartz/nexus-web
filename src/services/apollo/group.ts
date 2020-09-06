/* eslint-disable */
import { client } from './client'
import { GroupExistsDocument } from '../../graphql/index'
/* eslint-enable */

interface GroupExistsResponse {
  exists: boolean
  error: string | null
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
