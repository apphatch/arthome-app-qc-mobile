import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  shops: [],
};

const handlers = {
  [actionTypes.FETCH_SHOPS]: fetchShops,
  [actionTypes.FETCH_SHOPS_SUCCESS]: fetchShopsSuccess,
  [actionTypes.FETCH_SHOPS_FAILED]: fetchShopsFailed,
};

export default createReducer(initialState, handlers);

function fetchShops(state, action) {
  state.isLoading = true;
}

function fetchShopsSuccess(state, action) {
  const { shops = [] } = action.payload;
  state.isLoading = false;
  state.shops = shops;
}
function fetchShopsFailed(state, action) {
  state.isLoading = false;
  state.shops = [];
}
