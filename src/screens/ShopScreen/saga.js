import {
  put,
  call,
  select,
  // delay,
  all,
  takeLatest,
} from 'redux-saga/effects';

import * as actions from './actions';
import * as actionTypes from './actionTypes';
import {
  actions as loginActions,
  selectors as loginSelectors,
} from '../LoginScreen';

// ## API
import * as API from './services';

// dump
// import { data } from './data';

export function* fetchShops({ payload: { userId, search, filter } }) {
  try {
    let shops = [];
    let newHeaders = {};
    const token = yield select(loginSelectors.makeSelectToken());
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    if (search !== '') {
      const { data, headers } = yield call(API.searchShops, {
        search,
        token,
        authorization,
      });
      shops = data;
      newHeaders = headers;
    } else {
      const { data, headers } = yield call(API.fetchShops, {
        userId,
        token,
        authorization,
      });
      shops = data;
      newHeaders = headers;
    }
    console.log(filter);
    if (filter) {
      shops = shops.filter((shop) => shop.completed !== true);
    }
    yield put(loginActions.updateAuthorization(newHeaders.authorization));
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
