import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  stocks: [],
};

const handlers = {
  [actionTypes.FETCH_STOCKS]: fetchStocks,
  [actionTypes.FETCH_STOCKS_SUCCESS]: fetchStocksSuccess,
  [actionTypes.FETCH_STOCKS_FAILED]: fetchStocksFailed,
};

export default createReducer(initialState, handlers);

function fetchStocks(state, action) {
  state.isLoading = true;
}

function fetchStocksSuccess(state, action) {
  const { stocks = [] } = action.payload;
  state.isLoading = false;
  state.stocks = stocks;
}
function fetchStocksFailed(state, action) {
  state.isLoading = false;
}
