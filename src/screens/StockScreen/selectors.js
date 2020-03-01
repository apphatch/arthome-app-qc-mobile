import { createSelector } from 'reselect';

const selectStockDomain = () => state => state.stock;

const makeSelectIsLoading = () =>
  createSelector(selectStockDomain(), state => state.isLoading);

const makeSelectStocks = () =>
  createSelector(selectStockDomain(), state => state.stocks);

export { makeSelectIsLoading, makeSelectStocks };
