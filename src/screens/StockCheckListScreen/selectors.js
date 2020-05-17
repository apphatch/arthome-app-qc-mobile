import { createSelector } from 'reselect';
import { orderBy } from 'lodash';

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
const orderStocks = id => {
  return createSelector(
    [makeSelectCheckListById(id)],
    ({ checklist_items }) => orderBy(checklist_items, ['stock_name']),
  );
};

const makeSelectStocks = () =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.stocks,
  );

const makeSelectStockById = stockId =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.stocks.filter(stock => stockId === stock.id)[0],
  );

const makeSelectStocksHasDataNull = () =>
  createSelector(
    selectStockCheckListDomain(),
    state => state.stocks.filter(stock => stock.data === null),
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
  orderStocks,
  makeSelectStocks,
  makeSelectStockById,
  makeSelectStocksHasDataNull,
};
