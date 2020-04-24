import { createSelector } from 'reselect';

const selectStockCheckListDomain = () => state => state.stockCheckList;

const makeSelectIsLoading = () =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.isLoading,
  );

const makeSelectIsSubmitted = () =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.isSubmitted,
  );

const makeSelectIsDoneAlled = () =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.isDoneAll,
  );

const makeSelectCheckList = () =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.checkList,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.errorMessage,
  );

const makeSelectCheckListById = id =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.checkList.filter(item => item.id === id)[0],
  );
const makeSelectIsDoneAll = id =>
  createSelector(
    makeSelectCheckListById(id),
    cl => cl.checklist_items.filter(item => !item.data),
  );

const makeSelectTemplate = id =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.checkList.filter(item => item.id === id)[0]?.template,
  );
export const makeSelectCheckListItemById = (clId, itemId) =>
  createSelector(
    makeSelectCheckListById(clId),
    cl => cl.checklist_items.filter(item => item.id === itemId)[0],
  );

export {
  makeSelectIsLoading,
  makeSelectCheckList,
  makeSelectCheckListById,
  makeSelectTemplate,
  makeSelectIsSubmitted,
  makeSelectIsDoneAll,
  makeSelectIsDoneAlled,
  makeSelectErrorMessage,
};
