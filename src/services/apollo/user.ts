/* eslint-disable */
import { client } from './client'
import { MeDocument } from '../../graphql/index'
/* eslint-enable */

interface User {
  id: string
  email: string
  username: string
  admin: boolean
}

interface CurrentAccountResponse {
  user?: User
  error?: string
}

export const currentAccount = async (): Promise<CurrentAccountResponse> => {
  try {
    const response = await client.query({
      query: MeDocument,
    })

    const user = response.data?.me

    if (user) {
      return { user }
    }

    return { error: 'Failed to load account' }
  } catch (error) {
    return { error: error.message }
  }
}
