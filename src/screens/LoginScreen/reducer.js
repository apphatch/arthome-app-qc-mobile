import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
};

const handlers = {
  [actionTypes.LOGIN_REQUEST]: loginRequest,
  [actionTypes.LOGIN_FAILED]: loginFailed,
  [actionTypes.LOGIN_RESPONSE]: loginResponse,
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
}
