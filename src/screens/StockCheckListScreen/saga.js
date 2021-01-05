import { put, call, select, all, takeLatest, delay } from 'redux-saga/effects';
import { mapValues } from 'lodash';
import UUIDGenerator from 'react-native-uuid-generator';
import Config from 'react-native-config';
import _ from 'lodash';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';
import * as selectors from './selectors';

import { logger } from '../../utils';

import {
  selectors as loginSelectors,
  actions as loginActions,
} from '../LoginScreen';

export function* uploadPhoto({ payload }) {
  const { photo } = payload;
  try {
    yield delay(1000);
    const formData = new FormData();
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );

    const photoName = yield UUIDGenerator.getRandomUUID();
    formData.append('photo', {
      uri: photo,
      type: 'image/jpeg',
      name: photoName,
    });
    const response = yield call(API.uploadPhoto, {
      formData,
      authorization,
    });
    yield put(loginActions.updateAuthorization(response.headers.authorization));
    yield put(actions.uploadPhotoSuccess({ photo: response.data }));
  } catch (error) {
    yield put(actions.uploadPhotoFailed('Upload photo failed'));
  }
}

export function* submitCheckList({ payload }) {
  const { itemId, data, recordId } = payload;
  const { photo, ...rest } = data;
  try {
    yield delay(1000);
    let records = yield select(selectors.makeSelectRecordsOfStockById(itemId));
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const photo_uri = yield select(selectors.makeSelectPhoto());

    /**
     * If exit photo_uri => new data image exit.
     * If not exit phot_uri => update or create but don't have image
     */
    let newData = null;
    if (!photo_uri) {
      if (photo) {
        newData = {
          ...rest,
          photo_uri: photo.replace(Config.API_HOST, ''),
        };
      } else {
        newData = {
          ...rest,
        };
      }
    } else {
      newData = {
        ...rest,
        photo_uri,
      };
    }

    const formData = new FormData();
    if (records.length > 0) {
      if (recordId === null) {
        records = [...records, newData];
      } else {
        records = records.map((record, i) => {
          if (i === recordId) {
            record = newData;
          }
          return record;
        });
      }
    } else {
      records = [...records, newData];
    }
    formData.append('data', JSON.stringify({ records }));

    const res = yield call(API.submitCheckListItemData, {
      itemId,
      data: formData,
      authorization,
    });

    yield put(loginActions.updateAuthorization(res.headers.authorization));
    yield put(actions.submitSuccess({ itemId, data: { records } }));
  } catch (error) {
    console.log('function*submitCheckList -> error', error);
    yield put(actions.submitFailed('Gửi lỗi không thành công'));
  }
}

export function* removeRecord({ payload }) {
  const { itemId, recordId } = payload;
  try {
    yield delay(1000);
    let records = yield select(selectors.makeSelectRecordsOfStockById(itemId));

    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const formData = new FormData();

    if (records.length > 1) {
      records = records.filter((record, i) => i !== recordId);
    } else {
      records = [];
    }
    formData.append('data', JSON.stringify({ records }));

    const res = yield call(API.submitCheckListItemData, {
      itemId,
      data: formData,
      authorization,
    });

    yield put(loginActions.updateAuthorization(res.headers.authorization));
    yield put(actions.removeSuccess({ itemId, data: { records } }));
  } catch (error) {
    console.log('function*removeRecord -> error', error);
    yield put(actions.removeFailed(error.message));
  }
}

export function* fetchCheckList({ payload }) {
  try {
    yield delay(1000);
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const { shopId } = payload;
    const response = yield call(API.fetchCheckList, {
      shopId,
      authorization,
    });
    yield put(loginActions.updateAuthorization(response.headers.authorization));
    yield put(actions.checkListResponse({ checkList: response.data }));
  } catch (error) {
    console.log('function*fetchCheckList -> error', error);
    yield put(actions.fetchCheckListFailed(error.message));
  }
}

export function* markDoneAllCheckListItems({ payload: { clId, clType } }) {
  try {
    yield delay(1000);
    const stocksHasDataNull = yield select(
      selectors.makeSelectStocksHasDataNull(),
    );
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const currentCl = yield select(selectors.makeSelectCheckListById(clId));
    const { template } = currentCl;
    let data = [];
    const formData = new FormData();

    if (currentCl.checklist_type.toUpperCase() === 'OOS') {
      data = stocksHasDataNull.map((item) => {
        return {
          id: item.id,
          data: mapValues(template, (o) => {
            if (o.type === 'select') {
              return o.values[0];
            }
            return '';
          }),
        };
      });
    } else {
      data = stocksHasDataNull.map((item) => {
        return {
          id: item.id,
          data: mapValues(template, (o) => {
            if (o.type === 'input') {
              return '';
            }
            return '';
          }),
        };
      });
    }
    logger('function*markDoneAllCheckListItems -> data', data);
    formData.append('checklist_items', JSON.stringify(data));
    const res = yield call(API.markDoneAll, {
      data: formData,
      authorization,
      clId,
    });
    yield put(loginActions.updateAuthorization(res.headers.authorization));
    yield put(actions.markDoneAllSuccess());
    yield put(actions.fetchStocks({ search: '', checkListId: clId }));
  } catch (error) {
    yield put(actions.markDoneAllFailed(error.message));
  }
}

export function* fetchStocks({ payload }) {
  try {
    yield delay(1000);
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const res = yield call(API.fetchStockByCheckList, {
      ...payload,
      authorization,
    });
    const sortData = _.sortBy(res.data, [
      function (o) {
        return Number(o.importing_id);
      },
    ]);
    yield put(loginActions.updateAuthorization(res.headers.authorization));
    yield put(actions.stocksResponse({ stocks: sortData }));
  } catch (error) {
    yield put(actions.fetchStocksFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([
      yield takeLatest(actionTypes.UPLOAD_PHOTO, uploadPhoto),
      yield takeLatest(actionTypes.SUBMIT, submitCheckList),
      yield takeLatest(actionTypes.REMOVE, removeRecord),
      yield takeLatest(actionTypes.FETCH_CHECK_LIST, fetchCheckList),
      yield takeLatest(actionTypes.MARK_DONE_ALL, markDoneAllCheckListItems),
      yield takeLatest(actionTypes.FETCH_STOCKS, fetchStocks),
    ]);
  };
}
