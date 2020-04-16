import {
  put,
  call,
  // select,
  // delay,
  all,
  takeLatest,
} from 'redux-saga/effects';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';

// dump
// import { data } from './data';

export function* fetchShops({ payload: { userId, search } }) {
  try {
    let shops = [];
    const { data } = yield call(API.searchShops, { search });
    shops = data;
    // if (search) {
    //   const { data } = yield call(API.searchShops, { search });
    //   shops = data;
    // } else {
    //   const { data } = yield call(API.fetchShops, { userId });
    //   shops = data;
    // }
    yield put(actions.fetchShopsSuccess({ shops }));
  } catch (error) {
    yield put(actions.fetchShopsFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([yield takeLatest(actionTypes.FETCH_SHOPS, fetchShops)]);
  };
}
