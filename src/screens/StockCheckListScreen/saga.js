import {
  put,
  call,
  // select,
  all,
  takeLatest,
} from 'redux-saga/effects';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';

export function* submitCheckList({ payload }) {
  console.log('function*submitCheckList -> payload', payload);
  const { itemId, data } = payload;
  try {
    const res = yield call(API.submitCheckListItemData, { itemId, data });
    console.log('function*submitCheckList -> res', res);
    yield put(actions.submitSuccess({}));
  } catch (error) {
    console.log('function*submitCheckList -> error', error);
    yield put(actions.submitFailed(error.message));
  }
}

export function* fetchCheckList({ payload }) {
  try {
    const { shopId } = payload;
    const response = yield call(API.fetchCheckList, { shopId });
    yield put(actions.checkListResponse({ checkList: response.data }));
  } catch (error) {
    console.log('function*fetchCheckList -> error', error);
    yield put(actions.fetchCheckListFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([
      yield takeLatest(actionTypes.SUBMIT, submitCheckList),
      yield takeLatest(actionTypes.FETCH_CHECK_LIST, fetchCheckList),
    ]);
  };
}
