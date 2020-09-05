/* eslint-disable */
import { client } from './client'
import { UserLoginDocument, SignupUserDocument } from '../../graphql/index'
/* eslint-enable */

const ACCESS_TOKEN_KEY = 'accessToken'

interface AuthResponse {
  success: boolean
  error: string | null
}

interface RegisterInput {
  email: string
  username: string
  password: string
}

interface LoginInput {
  email: string
  password: string
}

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  try {
    const response = await client.mutate({
      mutation: SignupUserDocument,
      variables: { input },
    })

    const token = response.data?.signupUser.token

    let error = null
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token)
    } else {
      error = 'Error registering'
    }

    return { success: !!token, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  try {
    const { email, password } = input

    const response = await client.mutate({
      mutation: UserLoginDocument,
      variables: { input: { email, password } },
    })

    const token = response.data?.loginUser.token

    let error = null
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token)
    } else {
      error = 'Error logging in'
    }

    return { success: !!token, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const logout = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
