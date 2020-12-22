import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  errorMessage: '',
  checkList: [],
  stocks: [],
  isSubmitted: false,
  isDoneAll: false,
  photo: null,
};

const handlers = {
  [actionTypes.MARK_DONE_ALL]: markDoneAll,
  [actionTypes.MARK_DONE_ALL_RESPONSE]: markDoneAllSuccess,
  [actionTypes.MARK_DONE_ALL_FAILED]: markDoneAllFailed,

  [actionTypes.UPLOAD_PHOTO]: uploadPhoto,
  [actionTypes.UPLOAD_PHOTO_SUCCESS]: uploadPhotoSuccess,
  [actionTypes.UPLOAD_PHOTO_FAILED]: uploadPhotoFailed,

  [actionTypes.SUBMIT]: submit,
  [actionTypes.SUBMIT_SUCCESS]: submitSuccess,
  [actionTypes.SUBMIT_FAILED]: submitFailed,

  [actionTypes.REMOVE]: remove,
  [actionTypes.REMOVE_SUCCESS]: removeSuccess,
  [actionTypes.REMOVE_FAILED]: removeFailed,

  [actionTypes.FETCH_CHECK_LIST]: fetchCheckList,
  [actionTypes.CHECK_LIST_RESPONSE]: checkListResponse,
  [actionTypes.FETCH_CHECK_LIST_FAILED]: fetchCheckListFailed,

  [actionTypes.FETCH_STOCKS]: fetchStocks,
  [actionTypes.FETCH_STOCKS_RESPONSE]: stocksResponse,
  [actionTypes.FETCH_STOCKS_FAILED]: fetchStocksFailed,

  [actionTypes.RESET_PROPS]: resetProps,
};

export default createReducer(initialState, handlers);

function uploadPhoto(state, action) {
  state.isLoading = true;
  state.errorMessage = '';
}

function uploadPhotoSuccess(state, action) {
  state.isLoading = false;
  state.photo = action.payload.photo;
}
function uploadPhotoFailed(state, action) {
  state.isLoading = false;
  state.errorMessage = action.payload.errorMessage;
}

function submit(state, action) {
  state.isLoading = true;
  state.isSubmitted = false;
  state.errorMessage = '';
}

function submitSuccess(state, action) {
  state.isLoading = false;
  state.isSubmitted = true;
  const { itemId, data } = action.payload;
  state.stocks = state.stocks.map((stock) => {
    if (stock.id === itemId) {
      return {
        ...stock,
        data,
      };
    }
    return stock;
  });
}
function submitFailed(state, action) {
  state.isLoading = false;
  state.isSubmitted = false;
  state.errorMessage = action.payload.errorMessage;
}

function remove(state, action) {
  state.isLoading = true;
  state.isSubmitted = false;
  state.errorMessage = '';
}

function removeSuccess(state, action) {
  state.isLoading = false;
  state.isSubmitted = true;
  const { itemId, data } = action.payload;
  state.stocks = state.stocks.map((stock) => {
    if (stock.id === itemId) {
      return {
        ...stock,
        data,
      };
    }
    return stock;
  });
}
function removeFailed(state, action) {
  state.isLoading = false;
  state.isSubmitted = false;
  state.errorMessage = action.payload.errorMessage;
}

function fetchCheckList(state, action) {
  state.isLoading = true;
}

function checkListResponse(state, action) {
  state.isLoading = false;
  state.checkList = action.payload.checkList;
}

function fetchCheckListFailed(state, action) {
  state.isLoading = false;
  state.errorMessage = action.payload.errorMessage;
}

function fetchStocks(state, action) {
  state.isLoading = true;
}

function stocksResponse(state, action) {
  state.isLoading = false;
  state.stocks = action.payload.stocks;
  state.categories = action.payload.categories;
}

function fetchStocksFailed(state, action) {
  state.isLoading = false;
  state.stocks = [];
}

function resetProps(state, action) {
  state.isLoading = false;
  state.errorMessage = '';
  state.isSubmitted = false;
  state.isDoneAll = false;
  state.photo = '';
  state.isChangeImage = false;
}

function markDoneAll(state, action) {
  state.isLoading = true;
}
function markDoneAllSuccess(state, action) {
  state.isLoading = false;
  state.isDoneAll = true;
}
function markDoneAllFailed(state, action) {
  state.isLoading = false;
}
