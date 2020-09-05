import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as apollo from 'services/apollo'
import actions from './actions'

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const { success, error } = yield call(apollo.login, { email, password })
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

export function* REGISTER({ payload }) {
  const { email, password, username } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { success, error } = yield call(apollo.register, { email, username, password })

  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
    yield history.push('/')
    notification.success({
      message: 'Succesful Registration',
      description: 'You have successfully registered!',
    })
  } else if (error) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    notification.error({
      message: 'Signup Error',
      description: error,
      duration: 3, // seconds
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(apollo.currentAccount)
  if (response) {
    const { id, email, username } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        email,
        username,
        authorized: true,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(apollo.logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      email: '',
      username: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
