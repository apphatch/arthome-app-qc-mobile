import { put, call, select, all, takeLatest } from 'redux-saga/effects';
import { mapValues } from 'lodash';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

// ## API
import * as API from './services';
import * as selectors from './selectors';

import { logger } from '../../utils';

import { selectors as loginSelectors } from '../LoginScreen';

export function* submitCheckList({ payload }) {
  const { itemId, data, shopId } = payload;
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const token = yield select(loginSelectors.makeSelectToken());

    const res = yield call(API.submitCheckListItemData, {
      itemId,
      data: formData,
      token,
    });
    // const response = yield call(API.fetchCheckList, { shopId });
    // yield put(actions.checkListResponse({ checkList: response.data }));
    yield put(actions.submitSuccess({ itemId, data }));
  } catch (error) {
    console.log('function*submitCheckList -> error', error);
    yield put(actions.submitFailed(error.message));
  }
}

export function* fetchCheckList({ payload }) {
  try {
    const { shopId } = payload;
    const response = yield call(API.fetchCheckList, { shopId });
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
    const currentCl = yield select(selectors.makeSelectCheckListById(clId));

    const { template } = currentCl;
    let data = [];
    const formData = new FormData();

    if (currentCl.checklist_type === 'OOS') {
      data = stocksHasDataNull.map(item => {
        return {
          id: item.id,
          data: mapValues(template, o => {
            if (o.type === 'select') {
              return o.values[0];
            }
            return '';
          }),
        };
      });
    } else {
      data = stocksHasDataNull.map(item => {
        return {
          id: item.id,
          data: mapValues(template, o => {
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
    const res = yield call(API.markDoneAll, { data: formData, token, clId });
    yield put(actions.markDoneAllSuccess());
    yield put(actions.fetchStocks({ search: '', checkListId: clId }));
  } catch (error) {
    yield put(actions.markDoneAllFailed(error.message));
  }
}

export function* fetchStocks({ payload }) {
  try {
    const res = yield call(API.fetchStockByCheckList, { ...payload });
    yield put(actions.stocksResponse({ stocks: res.data }));
  } catch (error) {
    yield put(actions.fetchStocksFailed(error.message));
  }
}

export default function root() {
  return function* watch() {
    yield all([
      yield takeLatest(actionTypes.SUBMIT, submitCheckList),
      yield takeLatest(actionTypes.FETCH_CHECK_LIST, fetchCheckList),
      yield takeLatest(actionTypes.MARK_DONE_ALL, markDoneAllCheckListItems),
      yield takeLatest(actionTypes.FETCH_STOCKS, fetchStocks),
    ]);
  };
}
