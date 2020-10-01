/* eslint-disable */
import { Exchange } from 'types/exchange'
import { OrderSide, OrderType } from 'types/order'
import actions from './actions'
/* eslint-enable */

export interface IOrderSetState {
  orderSetDetail: IOrderSetDetailState
  createOrderSet: ICreateOrderSetState
}

export interface ICreateOrderSetState {
  submitting: boolean
}

export interface ICreateOrderSetPayload {
  groupId: string
  exchange: Exchange
  symbol: string
  price?: number
  percent: number
  side: OrderSide
  orderType: OrderType
  stopPrice?: number
  description?: string
  exchangeAccountIds: string[]
}

export interface IOrderSetDetailState {
  orderSetId: String | null
}

const initialOrderSetDetailState = {
  orderSetId: null,
}

export const initialState: IOrderSetState = {
  createOrderSet: {
    submitting: false,
  },
  orderSetDetail: initialOrderSetDetailState,
}

export default function orderSetReducer(state: IOrderSetState = initialState, action: any) {
  switch (action.type) {
    case actions.SET_CREATE_ORDER_SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
