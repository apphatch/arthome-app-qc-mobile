import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  errorMessage: '',
};

const handlers = {
  [actionTypes.SUBMIT]: submit,
  [actionTypes.SUBMIT_SUCCESS]: submitSuccess,
  [actionTypes.SUBMIT_FAILED]: submitFailed,
};

export default createReducer(initialState, handlers);

function submit(state, action) {
  state.isLoading = true;
}

function submitSuccess(state, action) {
  state.isLoading = false;
}
function submitFailed(state, action) {
  state.isLoading = false;
}
