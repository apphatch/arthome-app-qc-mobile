import { createSelector } from 'reselect';

const selectStockCheckListDomain = () => state => state.stockCheckList;

const makeSelectIsLoading = () =>
  createSelector(selectStockCheckListDomain(), state => state.isLoading);

const makeSelectIsSubmitted = () =>
  createSelector(selectStockCheckListDomain(), state => state.isSubmitted);

const makeSelectCheckList = () =>
  createSelector(selectStockCheckListDomain(), state => state.checkList);

const makeSelectCheckListById = id =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.checkList.filter(item => item.id === id)[0],
  );

const makeSelectTemplate = id =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.checkList.filter(item => item.id === id)[0]?.template,
  );

export {
  makeSelectIsLoading,
  makeSelectCheckList,
  makeSelectCheckListById,
  makeSelectTemplate,
  makeSelectIsSubmitted,
};
