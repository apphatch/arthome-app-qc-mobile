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

export function* login({ payload }) {
  const { username, password, setError } = payload;
  try {
    const response = yield call(API.login, { username, password });
    const {
      data: { user_id },
    } = response;
    yield delay(2000);
    yield put(
      actions.onLoginResponse({
        token: response.headers['x-csrf-token'],
        user_id,
      }),
    );
  } catch (error) {
    yield put(actions.loginFailed(error.message));
    setError('Đăng nhập không thành công');
  }
}

export function* logout({ payload: { navigation } }) {
  try {
    yield call(API.logout, {});
  } catch (error) {
    console.log('TCL: function*logout -> error', error);
  }
}

export default function root() {
  return function* watch() {
    yield all([
      yield takeLatest(actionTypes.LOGIN_REQUEST, login),
      yield takeLatest(actionTypes.LOGOUT_REQUEST, logout),
    ]);
  };
}
