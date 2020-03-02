import {
  put,
  // call,
  // select,
  delay,
  all,
  takeLatest,
} from 'redux-saga/effects';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
// import * as API from './services';

export function* submitCheckList() {
  try {
    yield delay(3000);
    yield put(actions.submitSuccess({}));
  } catch (error) {
    yield put(actions.submitFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([yield takeLatest(actionTypes.SUBMIT, submitCheckList)]);
  };
}
