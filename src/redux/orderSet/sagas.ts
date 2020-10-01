import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import * as apollo from 'services/apollo'

/* eslint-disable */
import actions from './actions'
import { ICreateOrderSetPayload } from './reducers'
import { ICreateOrderSetResponse } from 'services/apollo/order'
/* eslint-enable */

export function* CREATE_ORDER_SET({ payload }: { payload: ICreateOrderSetPayload }) {
  yield put({
    type: 'orderSet/SET_CREATE_ORDER_SET_STATE',
    payload: {
      createOrderSet: {
        submitting: true,
      },
    },
  })

  notification.success({
    message: 'Created Order Set',
    description: `${payload.symbol} on ${payload.exchange}`,
  })
  const { orderSetId, error }: ICreateOrderSetResponse = yield call(apollo.createOrderSet, payload)

  yield put({
    type: 'orderSet/SET_CREATE_ORDER_SET_STATE',
    payload: {
      createOrderSet: {
        submitting: false,
      },
    },
  })

  if (orderSetId) {
    yield put({
      type: 'orderSet/SET_ORDER_SET_DETAIL_STATE',
      payload: {
        orderSetDetail: {
          orderSetId,
        },
      },
    })
    notification.success({
      message: 'Created Order Set',
      description: `${payload.symbol} on ${payload.exchange}`,
    })
  } else if (error) {
    notification.error({
      message: 'Create Order Set Error',
      description: error,
      duration: 3, // seconds
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.CREATE_ORDER_SET, CREATE_ORDER_SET)])
}
