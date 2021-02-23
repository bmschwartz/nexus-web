/* eslint-disable */
/* eslint-enable */

import Amplify, { Auth as AmplifyAuth } from 'aws-amplify'
import awsExports from '../../aws-exports'

const AUTH_USER_TOKEN_KEY = 'accessToken'

interface RegisterResponse {
  success: boolean
  error?: string
}

interface VerificationResponse {
  success: boolean
  error?: string
}

interface LoginResponse {
  success: boolean
  error?: string
}

Amplify.configure(awsExports)
AmplifyAuth.configure(awsExports)

const register = async (email: string, password: string): Promise<RegisterResponse> => {
  try {
    await AmplifyAuth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const verifyRegistrationCode = async (
  email: string,
  verificationCode: string,
): Promise<VerificationResponse> => {
  try {
    await AmplifyAuth.confirmSignUp(email, verificationCode)
    return { success: true }
  } catch (e) {
    return { success: false, error: e }
  }
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const user = await AmplifyAuth.signIn(email, password)
    console.log({ user })
    localStorage.setItem(AUTH_USER_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken)
    return { success: true }
  } catch (e) {
    return { success: false, error: e }
  }
}

// export const login = async (input: LoginInput): Promise<AuthResponse> => {
//   try {
//     const { email, password } = input
//
//     const response = await client.mutate({
//       mutation: UserLoginDocument,
//       variables: { input: { email, password } },
//     })
//
//     const token = response.data?.loginUser.token
//
//     let error = null
//     if (token) {
//       localStorage.setItem(ACCESS_TOKEN_KEY, token)
//     } else {
//       error = 'Error logging in'
//     }
//
//     return { success: !!token, error }
//   } catch (error) {
//     return { success: false, error: error.message }
//   }
// }
//
// export const logout = (): void => {
//   localStorage.removeItem(ACCESS_TOKEN_KEY)
// }

export default {
  login,
  register,
  verifyRegistrationCode,
}
