import { all, takeEvery, put } from 'redux-saga/effects'

/* eslint-disable */
import actions from './actions'
import { CreateOrderSetState } from './reducers'
/* eslint-enable */

export function* CREATE_ORDER_SET({ payload }: { payload: CreateOrderSetState }) {
  yield put({
    type: 'orderSet/SET_CREATE_ORDER_SET_STATE',
    payload: {
      createOrderSet: {
        submitting: true,
      },
    },
  })

  console.log(payload)

  // const { groupId, error }: CreateGroupResponse = yield call(apollo.createGroup, input)
  // if (groupId) {
  //   yield put({
  //     type: 'group/SET_CREATE_GROUP_STATE',
  //     payload: {
  //       createGroup: {
  //         submitting: false,
  //       },
  //     },
  //   })
  //   yield put({
  //     type: 'group/SET_GROUP_DETAIL_STATE',
  //     payload: {
  //       groupDetail: {
  //         groupId,
  //       },
  //     },
  //   })
  //   yield history.push(`/groups/${groupId}`)
  //   notification.success({
  //     message: 'Created Group',
  //     description: `You created ${input.name}`,
  //   })
  // } else if (error) {
  //   yield put({
  //     type: 'group/SET_CREATE_GROUP_STATE',
  //     payload: {
  //       createGroup: {
  //         ...initialGroupState.createGroup,
  //       },
  //     },
  //   })
  //   notification.error({
  //     message: 'Login Error',
  //     description: error,
  //     duration: 3, // seconds
  //   })
  // }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.CREATE_ORDER_SET, CREATE_ORDER_SET)])
}
