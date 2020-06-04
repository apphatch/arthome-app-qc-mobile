import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  errorMessage: '',
};

const handlers = {
  [actionTypes.SHOP_PICTURE_REQUEST]: checkOutRequest,
  [actionTypes.SHOP_PICTURE_RESPONSE]: checkOutResponse,
  [actionTypes.SHOP_PICTURE_FAILED]: checkOutFailed,
  [actionTypes.SET_ERROR]: setError,
};

export default createReducer(initialState, handlers);

function checkOutRequest(state, action) {
  state.isLoading = true;
  state.errorMessage = '';
}

function checkOutResponse(state, action) {
  state.isLoading = false;
}

function checkOutFailed(state, action) {
  state.isLoading = false;
  state.errorMessage = action.payload.errorMessage;
}

function setError(state, action) {
  state.errorMessage = action.payload.errorMessage;
}
