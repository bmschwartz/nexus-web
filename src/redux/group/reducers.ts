/* eslint-disable */
import actions from './actions'
/* eslint-enable */

export interface GroupState {
  createGroup: CreateGroupState
}

export interface CreateGroupState {
  name: string
  description: string
  telegram?: string
  discord?: string
  email?: string
  membershipLength: number
  membershipFee: number
  payInPlatform: boolean
  payoutCurrency?: string
  payoutAddress?: string
  submitting: boolean
}

export const initialState: GroupState = {
  createGroup: {
    name: '',
    description: '',
    telegram: '',
    discord: '',
    email: '',
    membershipLength: 1,
    membershipFee: 0.0,
    payInPlatform: true,
    payoutCurrency: 'BTC',
    payoutAddress: '',
    submitting: false,
  },
}

export default function userReducer(state: GroupState = initialState, action: any) {
  switch (action.type) {
    case actions.SET_CREATE_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
