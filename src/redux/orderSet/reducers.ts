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
  exchange: Exchange
  symbol: string
  side: OrderSide
  type: OrderType
  percent: number
  price: number
  exchangeAccountIds: string[]
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
    exchange: Exchange.BITMEX,
    symbol: '',
    side: OrderSide.BUY,
    type: OrderType.MARKET,
    percent: 0,
    price: 0,
    exchangeAccountIds: [],
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
