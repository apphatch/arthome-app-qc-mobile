import { put, call, select, all, takeLatest } from 'redux-saga/effects';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';
import _ from 'lodash';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';

import { selectors as loginSelectors } from '../LoginScreen';

export function* checkIn({ payload }) {
  try {
    const { note, photo, shopId } = payload;
    const formData = new FormData();
    const photoName = yield UUIDGenerator.getRandomUUID();
    const token = yield select(loginSelectors.makeSelectToken());

    formData.append('photo', {
      uri: photo,
      type: 'image/jpeg',
      name: photoName,
    });
    formData.append('note', note);
    formData.append('time', moment().format('DD/MM/YYYY'));
    const response = yield call(API.checkIn, { formData, token, shopId });
    console.log('function*checkIn -> response', response);
    yield put(
      actions.onCheckInResponse({
        checkInData: response.data.last_checkin_checkout,
        isCheckIn: !_.isEmpty(response.data.last_checkin_checkout),
      }),
    );
  } catch (error) {
    console.log('function*login -> error', error);
    yield put(actions.checkInFailed(error.message));
  }
}

export function* checkOut({ payload }) {
  try {
    const token = yield select(loginSelectors.makeSelectToken());
    const { note, photo, shopId } = payload;
    const formData = new FormData();
    const photoName = yield UUIDGenerator.getRandomUUID();
    formData.append('photo', {
      uri: photo,
      type: 'image/jpeg',
      name: photoName,
    });
    formData.append('note', note);
    formData.append('time', moment().format('DD/MM/YYYY'));
    const response = yield call(API.checkOut, { formData, token, shopId });
    console.log('function*checkOut -> response', response);
    yield put(actions.onCheckOutResponse());
  } catch (error) {
    console.log('function*checkOut -> error', error);
    yield put(actions.checkOutFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([
      yield takeLatest(actionTypes.CHECK_IN_REQUEST, checkIn),
      yield takeLatest(actionTypes.CHECK_OUT_REQUEST, checkOut),
    ]);
  };
}
