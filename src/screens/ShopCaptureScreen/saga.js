import { put, call, select, all, takeLatest } from 'redux-saga/effects';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';

import {
  selectors as loginSelectors,
  actions as loginActions,
} from '../LoginScreen';

import { logger } from '../../utils';

export function* checkOut({ payload }) {
  const { note, photos, shopId, setError, navigation } = payload;
  try {
    const formData = new FormData();

    const token = yield select(loginSelectors.makeSelectToken());
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );

    for (let i = 0; i < photos.length; i++) {
      const element = photos[i];
      const photoName = yield UUIDGenerator.getRandomUUID();
      formData.append('photos[]', {
        uri: element.path,
        type: 'image/jpeg',
        name: photoName,
      });
    }
    formData.append('note', note);
    formData.append('time', moment().format('DD/MM/YYYY'));
    const response = yield call(API.checkOut, {
      formData,
      token,
      authorization,
      shopId,
    });
    logger('function*login -> error', response);
    if (response?.data?.status === 'failed') {
      setError('Gửi không thành công');
      yield put(actions.shopPictureFailed('Gửi không thành công'));
    } else {
      yield put(
        actions.onShopPictureResponse({
          data: response.data,
        }),
      );
      yield put(
        loginActions.updateAuthorization(response.headers['authorization']),
      );
      navigation.dispatch(CommonActions.goBack());
    }
  } catch (error) {
    logger('function*login -> error', error);
    yield put(actions.shopPictureFailed('Gửi không thành công'));
  }
}

export default function root() {
  return function* watch() {
    yield all([yield takeLatest(actionTypes.SHOP_PICTURE_REQUEST, checkOut)]);
  };
}
