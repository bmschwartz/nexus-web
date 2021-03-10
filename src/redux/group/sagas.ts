import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as apollo from 'services/apollo'

/* eslint-disable */
import actions from './actions'
import { CreateGroupState, initialState as initialGroupState } from './reducers'
import { CreateGroupResponse } from 'services/apollo/group'
/* eslint-enable */

export function* CREATE_GROUP({ payload }: { payload: CreateGroupState }) {
  yield put({
    type: 'group/SET_CREATE_STATE',
    payload: {
      createGroup: {
        submitting: true,
      },
    },
  })

  const { submitting, ...input } = payload

  const { groupId, error }: CreateGroupResponse = yield call(apollo.createGroup, input)
  if (groupId) {
    yield put({
      type: 'group/SET_CREATE_STATE',
      payload: {
        createGroup: {
          submitting: false,
        },
      },
    })
    yield put({
      type: 'group/SET_GROUP_DETAIL_STATE',
      payload: {
        groupDetail: {
          groupId,
        },
      },
    })
    yield history.push(`/profile`)
    notification.success({
      message: 'Created Group',
      description: `You created ${input.name}`,
    })
  } else if (error) {
    yield put({
      type: 'group/SET_CREATE_STATE',
      payload: {
        createGroup: {
          ...initialGroupState.createGroup,
        },
      },
    })
    notification.error({
      message: 'Create Group Error',
      description: error,
      duration: 3, // seconds
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.CREATE_GROUP, CREATE_GROUP)])
}
