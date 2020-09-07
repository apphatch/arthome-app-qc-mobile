import { createAction } from '../../utils';
import * as actionTypes from './actionTypes';

export const markDoneAll = ({ ...rest }) =>
  createAction(actionTypes.MARK_DONE_ALL, { ...rest });
export const markDoneAllSuccess = (response) =>
  createAction(actionTypes.MARK_DONE_ALL_RESPONSE, { ...response });
export const markDoneAllFailed = (errorMessage) =>
  createAction(actionTypes.MARK_DONE_ALL_FAILED, { errorMessage });

export const submit = ({ itemId, data, recordId }) =>
  createAction(actionTypes.SUBMIT, { itemId, data, recordId });
export const submitSuccess = (response) =>
  createAction(actionTypes.SUBMIT_SUCCESS, { ...response });
export const submitFailed = (errorMessage) =>
  createAction(actionTypes.SUBMIT_FAILED, { errorMessage });

export const remove = ({ itemId, recordId }) =>
  createAction(actionTypes.REMOVE, { itemId, recordId });
export const removeSuccess = (response) =>
  createAction(actionTypes.REMOVE_SUCCESS, { ...response });
export const removeFailed = (errorMessage) =>
  createAction(actionTypes.REMOVE_FAILED, { errorMessage });

export const fetchCheckList = (data) =>
  createAction(actionTypes.FETCH_CHECK_LIST, { ...data });
export const checkListResponse = (res) =>
  createAction(actionTypes.CHECK_LIST_RESPONSE, { ...res });
export const fetchCheckListFailed = (errorMessage) =>
  createAction(actionTypes.FETCH_CHECK_LIST_FAILED, { errorMessage });

export const fetchStocks = (data) =>
  createAction(actionTypes.FETCH_STOCKS, { ...data });
export const stocksResponse = (res) =>
  createAction(actionTypes.FETCH_STOCKS_RESPONSE, { ...res });
export const fetchStocksFailed = (errorMessage) =>
  createAction(actionTypes.FETCH_STOCKS_FAILED, { errorMessage });

export const getItems = (id) => createAction(actionTypes.GET_ITEMS, { id });
export const resetProps = () => createAction(actionTypes.RESET_PROPS, {});
