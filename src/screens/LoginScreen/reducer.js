import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: null,
  user_id: null,
};

const handlers = {
  [actionTypes.LOGIN_REQUEST]: loginRequest,
  [actionTypes.LOGIN_FAILED]: loginFailed,
  [actionTypes.LOGIN_RESPONSE]: loginResponse,

  [actionTypes.LOGOUT_REQUEST]: logoutRequest,
};

export default createReducer(initialState, handlers);

function loginRequest(state, action) {
  state.isLoading = true;
  state.isLoggedIn = false;
}

function loginFailed(state, action) {
  state.isLoggedIn = false;
  state.isLoading = false;
}
function loginResponse(state, action) {
  state.isLoggedIn = true;
  state.isLoading = false;
  state.token = action.payload.token;
  state.user_id = action.payload.user_id;
}

function logoutRequest(state, action) {
  state.token = null;
  state.isLoggedIn = false;
}
