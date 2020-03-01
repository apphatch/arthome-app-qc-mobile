import { createAction } from '../../utils';
import * as actionTypes from './actionTypes';

export const requestLogin = (username, password, navigation) =>
  createAction(actionTypes.LOGIN_REQUEST, { username, password, navigation });

export const onLoginResponse = response =>
  createAction(actionTypes.LOGIN_RESPONSE, { response });

export const loginFailed = () => createAction(actionTypes.LOGIN_FAILED);

export const logout = navigation =>
  createAction(actionTypes.LOGOUT_REQUEST, { navigation });
