import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'

/* eslint-disable */
import group from './group/sagas'
import orderSet from './orderSet/sagas'
/* eslint-enable */

export default function* rootSaga() {
  yield all([user(), menu(), settings(), group(), orderSet()])
}
