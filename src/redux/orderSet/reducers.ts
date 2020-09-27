/* eslint-disable */
import { Exchange } from 'types/exchange'
import { OrderSide, OrderType } from 'types/order'
import actions from './actions'
/* eslint-enable */

export interface OrderSetState {
  orderSetDetail: OrderSetDetailState
  createOrderSet: CreateOrderSetState
}

export interface CreateOrderSetState {
  submitting: boolean
}

export interface CreateOrderSetPayload {
  exchange: Exchange
  symbol: string
  side: OrderSide
  type: OrderType
  percent: number
  price: number
  groupId: string
  exchangeAccountIds: string[]
}

export interface OrderSetDetailState {
  orderSetId: String | null
}

const initialOrderSetDetailState = {
  orderSetId: null,
}

export const initialState: OrderSetState = {
  createOrderSet: {
    submitting: false,
  },
  orderSetDetail: initialOrderSetDetailState,
}

export default function orderSetReducer(state: OrderSetState = initialState, action: any) {
  switch (action.type) {
    case actions.SET_CREATE_ORDER_SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
