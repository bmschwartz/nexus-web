import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
/* eslint-disable */
import group from './group/reducers'
import orderSet from './orderSet/reducers'
/* eslint-enable */

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    group,
    orderSet,
    settings,
  })
