/* eslint-disable */
import { Exchange } from 'types/exchange'
import { Membership } from 'types/membership'
import { OrderSide, OrderType } from 'types/order'
import actions from './actions'
/* eslint-enable */

export interface OrderSetState {
  orderSetDetail: OrderSetDetailState
  createOrderSet: CreateOrderSetState
}

export interface CreateOrderSetState {
  exchange: Exchange
  symbol: string
  side: OrderSide
  type: OrderType
  percent: number
  price: number
  members: Membership[]
  submitting: boolean
}

export interface OrderSetDetailState {
  orderSetId: String | null
}

const initialOrderSetDetailState = {
  orderSetId: null,
}

export const initialState: OrderSetState = {
  createOrderSet: {
    exchange: '',
    symbol: '',
    side: '',
    type: '',
    percent: 0,
    price: 0,
    members: [],
    submitting: false,
  },
  orderSetDetail: initialOrderSetDetailState,
}

export default function groupReducer(state: OrderSetState = initialState, action: any) {
  switch (action.type) {
    case actions.SET_CREATE_ORDER_SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
