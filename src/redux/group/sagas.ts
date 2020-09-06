import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as apollo from 'services/apollo'
import actions from './actions'

export function* CREATE_GROUP({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'group/SET_CREATE_STATE',
    payload: {
      submitting: true,
    },
  })

  const { success, error } = yield call(apollo.createGroup, { email, password })
  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
    yield history.push('/')
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in!',
    })
  } else if (error) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    notification.error({
      message: 'Login Error',
      description: error,
      duration: 3, // seconds
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.CREATE_GROUP, CREATE_GROUP)])
}
