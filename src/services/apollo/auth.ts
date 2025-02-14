/* eslint-disable */
import { client } from './client'
import {
  UserLoginDocument,
  SignupUserDocument,
  VerifySignUpCodeDocument,
  UserType,
} from '../../graphql/index'
import jwtDecode from 'jwt-decode'
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
  userType: string
}

interface RegisterResponse {
  success: boolean
  error?: string
}

interface LoginInput {
  email: string
  password: string
}

interface VerifySignUpCodeInput {
  email: string
  code: string
}

interface VerifySignUpCodeResponse {
  success: boolean
  error?: string
}

interface TokenData {
  exp?: number
  iat?: number
  userId?: string
  userType?: string
}

export const register = async (input: RegisterInput): Promise<RegisterResponse> => {
  try {
    const response = await client.mutate({
      mutation: SignupUserDocument,
      variables: { input },
    })

    const { success, error } = response.data?.signupUser
    return { success, error }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const verifySignUpCode = async (
  input: VerifySignUpCodeInput,
): Promise<VerifySignUpCodeResponse> => {
  try {
    const response = await client.mutate({
      mutation: VerifySignUpCodeDocument,
      variables: { input },
    })

    const { success, error } = response.data?.verifySignUpCode

    return { success, error }
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

const getTokenData = (): TokenData | null => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) {
    return null
  }

  const decoded = jwtDecode(token)
  if (decoded === null || decoded === undefined) {
    return null
  }

  return decoded as TokenData
}

export const isAuthenticated = () => {
  const data = getTokenData()
  if (!data) {
    return false
  }

  if (!data.iat || !data.exp) {
    return false
  }

  const currentTime = Math.round(new Date().getTime() / 1000)
  if (data.iat < currentTime && currentTime < data.exp) {
    return !!data.userId
  }
  return false
}

export const isGroupOwnerOrTraderUserType = (): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const data = getTokenData()
  if (!data || data.userType === undefined) {
    return false
  }

  return [UserType.Owner.valueOf(), UserType.Trader.valueOf()].includes(data.userType)
}

export const isGroupMemberUserType = (): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const data = getTokenData()
  if (!data || data.userType === undefined) {
    return false
  }

  return [UserType.Member.valueOf()].includes(data.userType)
}
