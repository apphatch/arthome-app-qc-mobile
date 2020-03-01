import { createAction } from '../../utils';
import * as actionTypes from './actionTypes';

export const fetchShops = () => createAction(actionTypes.FETCH_SHOPS);
export const fetchShopsSuccess = response =>
  createAction(actionTypes.FETCH_SHOPS_SUCCESS, { ...response });
export const fetchShopsFailed = () =>
  createAction(actionTypes.FETCH_SHOPS_FAILED);
