import { put, call, select, all, takeLatest } from 'redux-saga/effects';
import { mapValues } from 'lodash';

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

export function* submitCheckList({ payload }) {
  const { itemId, data, recordId } = payload;
  try {
    let records = yield select(selectors.makeSelectRecordsOfStockById(itemId));
    const token = yield select(loginSelectors.makeSelectToken());
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const formData = new FormData();
    if (records.length > 0) {
      if (recordId === undefined) {
        records = [...records, data];
      } else {
        records = records.map((record, i) => {
          if (i === recordId) {
            record = data;
          }
          return record;
        });
      }
    } else {
      records = [...records, data];
    }
    formData.append('data', JSON.stringify({ records }));

    const res = yield call(API.submitCheckListItemData, {
      itemId,
      data: formData,
      token,
      authorization,
    });

    yield put(loginActions.updateAuthorization(res.headers.authorization));
    yield put(actions.submitSuccess({ itemId, data: { records } }));
  } catch (error) {
    console.log('function*submitCheckList -> error', error);
    yield put(actions.submitFailed(error.message));
  }
}

export function* removeRecord({ payload }) {
  const { itemId, recordId } = payload;
  try {
    let records = yield select(selectors.makeSelectRecordsOfStockById(itemId));
    const token = yield select(loginSelectors.makeSelectToken());
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const formData = new FormData();
    if (records.length > 1) {
      if (recordId) {
        records = records.filter((record, i) => i !== recordId);
      }
    } else {
      records = [];
    }
    formData.append('data', JSON.stringify({ records }));

    const res = yield call(API.submitCheckListItemData, {
      itemId,
      data: formData,
      token,
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
    const token = yield select(loginSelectors.makeSelectToken());
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const { shopId } = payload;
    const response = yield call(API.fetchCheckList, {
      shopId,
      token,
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
    const stocksHasDataNull = yield select(
      selectors.makeSelectStocksHasDataNull(),
    );
    const token = yield select(loginSelectors.makeSelectToken());
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
      token,
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
    const token = yield select(loginSelectors.makeSelectToken());
    const authorization = yield select(
      loginSelectors.makeSelectAuthorization(),
    );
    const res = yield call(API.fetchStockByCheckList, {
      ...payload,
      token,
      authorization,
    });
    yield put(loginActions.updateAuthorization(res.headers.authorization));
    yield put(actions.stocksResponse({ stocks: res.data }));
  } catch (error) {
    yield put(actions.fetchStocksFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([
      yield takeLatest(actionTypes.SUBMIT, submitCheckList),
      yield takeLatest(actionTypes.REMOVE, removeRecord),
      yield takeLatest(actionTypes.FETCH_CHECK_LIST, fetchCheckList),
      yield takeLatest(actionTypes.MARK_DONE_ALL, markDoneAllCheckListItems),
      yield takeLatest(actionTypes.FETCH_STOCKS, fetchStocks),
    ]);
  };
}
