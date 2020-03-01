import {
  put,
  // call,
  // select,
  delay,
  all,
  takeLatest,
} from 'redux-saga/effects';
import { CommonActions } from '@react-navigation/native';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
// import * as API from './services';

export function* login({ payload }) {
  try {
    const {
      // username,
      //  password,
      navigation,
    } = payload;
    // const response = yield call(API.login, {username, password});
    yield delay(2000);
    yield put(actions.onLoginResponse({}));
    navigation.navigate('ShopScreen');
  } catch (error) {
    yield put(actions.loginFailed(error.message));
  }
}

export function* logout({ payload: { navigation } }) {
  try {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'LoginScreen',
      }),
    );
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
