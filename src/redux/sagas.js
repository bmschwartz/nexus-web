import { all } from 'redux-saga/effects'
import user from './user/sagas'
import settings from './settings/sagas'

/* eslint-disable */
import group from './group/sagas'
/* eslint-enable */

export default function* rootSaga() {
  yield all([user(), settings(), group()])
}
