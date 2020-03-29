import { createSelector } from 'reselect';

const selectStockCheckListDomain = () => state => state.stockCheckList;

const makeSelectIsLoading = () =>
  createSelector(selectStockCheckListDomain(), state => state.isLoading);

const makeSelectCheckList = () =>
  createSelector(selectStockCheckListDomain(), state => state.checkList);

export { makeSelectIsLoading, makeSelectCheckList };
