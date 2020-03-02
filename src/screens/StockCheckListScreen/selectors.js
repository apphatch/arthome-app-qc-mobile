import { createSelector } from 'reselect';

const selectStockCheckListDomain = () => state => state.stockCheckList;

const makeSelectIsLoading = () =>
  createSelector(selectStockCheckListDomain(), state => state.isLoading);

export { makeSelectIsLoading };
