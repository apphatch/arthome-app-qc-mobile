import {
  put,
  call,
  // select,
  delay,
  all,
  takeLatest,
} from 'redux-saga/effects';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';

// dump
// import { data } from './data';

export function* fetchShops({ payload: { userId } }) {
  try {
    const response = yield call(API.fetchShops, { userId });
    console.log('function*fetchShops -> response', response);
    yield delay(2000);
    yield put(actions.fetchShopsSuccess({ shops: response.data }));
  } catch (error) {
    yield put(actions.fetchShopsFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([yield takeLatest(actionTypes.FETCH_SHOPS, fetchShops)]);
  };
}
