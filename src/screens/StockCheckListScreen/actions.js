import { createAction } from '../../utils';
import * as actionTypes from './actionTypes';

export const submit = ({ shopId, stockId, data }) =>
  createAction(actionTypes.SUBMIT, { shopId, stockId, data });
export const submitSuccess = response =>
  createAction(actionTypes.SUBMIT_SUCCESS, { response });
export const submitFailed = errorMessage =>
  createAction(actionTypes.SUBMIT_FAILED, { errorMessage });
