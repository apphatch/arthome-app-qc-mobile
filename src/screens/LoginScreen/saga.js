import { put, call, delay, all, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';

export function* login({ payload }) {
  const { username, password, setError } = payload;
  try {
    yield delay(1000);
    const response = yield call(API.login, { username, password });
    const {
      data: { user_id },
    } = response;
    yield put(
      actions.onLoginResponse({
        user_id,
      }),
    );
    yield put(actions.updateAuthorization(response.headers.authorization));
    yield put(actions.rememberAccount(username, password));
  } catch (error) {
    yield put(actions.loginFailed(error.message));
    setError('Đăng nhập không thành công');
  }
}

export function* logout() {
  try {
    yield delay(1000);
    const response = yield call(API.logout);
    yield put(actions.onLogoutSuccess());
  } catch (error) {
    console.log('TCL: function*logout -> error', error);
    yield put(actions.logoutFailed(''));
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
