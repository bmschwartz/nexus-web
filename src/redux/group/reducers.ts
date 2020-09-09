/* eslint-disable */
import actions from './actions'
/* eslint-enable */

export interface GroupState {
  groupDetail: GroupDetailState
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

export enum GroupDetailsTab {
  DASHBOARD,
  ORDERS,
  POSITIONS,
  MEMBERS,
  PROFILE,
  SETTINGS,
}

export enum OrdersTabState {
  VIEW_ALL,
  CREATE,
  VIEW_DETAIL,
}
export enum MembersTabState {
  VIEW_ALL,
  VIEW_DETAIL,
}
export enum PositionsTabState {
  VIEW_ALL,
  VIEW_DETAIL,
}

export interface GroupDetailState {
  groupId: String | null
  currentTab: GroupDetailsTab
  ordersTabState: OrdersTabState
  membersTabState: MembersTabState
  positionsTabState: PositionsTabState
}

const initialGroupDetailState = {
  groupId: null,
  currentTab: GroupDetailsTab.DASHBOARD,
  ordersTabState: OrdersTabState.VIEW_ALL,
  membersTabState: MembersTabState.VIEW_ALL,
  positionsTabState: PositionsTabState.VIEW_ALL,
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
  groupDetail: initialGroupDetailState,
}

const handleGroupDetailStateChange = (state: GroupState, { payload }: any): GroupState => {
  let detailState = state.groupDetail

  if (groupIdChanged(state, payload)) {
    detailState = { ...initialGroupDetailState, groupId: payload.groupDetail.groupId }
  }

  return { ...state, groupDetail: detailState }
}

const groupIdChanged = (state: GroupState, payload: any): boolean => {
  const {
    groupDetail: { groupId: originalGroupId },
  } = state

  if (!payload || !payload.groupDetail) {
    return false
  }

  return originalGroupId !== payload.groupDetail.groupId
}

export default function groupReducer(state: GroupState = initialState, action: any) {
  switch (action.type) {
    case actions.SET_CREATE_STATE:
      return { ...state, ...action.payload }
    case actions.SET_GROUP_DETAIL_STATE:
      return handleGroupDetailStateChange(state, action)
    default:
      return state
  }
}
