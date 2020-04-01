import { put, call, select, all, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';

import { selectors as loginSelectors } from '../LoginScreen';

export function* submitCheckList({ payload }) {
  const { itemId, data, shopId } = payload;
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const token = yield select(loginSelectors.makeSelectToken());

    const res = yield call(API.submitCheckListItemData, {
      itemId,
      data: formData,
      token,
    });
    console.log('function*submitCheckList -> res', res);
    const response = yield call(API.fetchCheckList, { shopId });
    yield put(actions.checkListResponse({ checkList: response.data }));
    yield put(actions.submitSuccess({}));
  } catch (error) {
    console.log('function*submitCheckList -> error', error);
    yield put(actions.submitFailed(error.message));
  }
}

export function* fetchCheckList({ payload }) {
  console.log('function*fetchCheckList -> payload', payload);
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
