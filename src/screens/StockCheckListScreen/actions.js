import { createAction } from '../../utils';
import * as actionTypes from './actionTypes';

export const submit = ({ shopId, stockId, data }) =>
  createAction(actionTypes.SUBMIT, { shopId, stockId, data });
export const submitSuccess = response =>
  createAction(actionTypes.SUBMIT_SUCCESS, { response });
export const submitFailed = errorMessage =>
  createAction(actionTypes.SUBMIT_FAILED, { errorMessage });

export const fetchCheckList = data =>
  createAction(actionTypes.FETCH_CHECK_LIST, { ...data });
export const checkListResponse = res =>
  createAction(actionTypes.CHECK_LIST_RESPONSE, { ...res });
export const fetchCheckListFailed = mes =>
  createAction(actionTypes.FETCH_CHECK_LIST_FAILED, { mes });
