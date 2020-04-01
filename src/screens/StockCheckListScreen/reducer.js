import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  errorMessage: '',
  checkList: [],
  isSubmitted: false,
};

const handlers = {
  [actionTypes.SUBMIT]: submit,
  [actionTypes.SUBMIT_SUCCESS]: submitSuccess,
  [actionTypes.SUBMIT_FAILED]: submitFailed,

  [actionTypes.CHECK_LIST_RESPONSE]: checkListResponse,
  [actionTypes.RESET_PROPS]: resetProps,
};

export default createReducer(initialState, handlers);

function submit(state, action) {
  state.isLoading = true;
  state.isSubmitted = false;
}

function submitSuccess(state, action) {
  state.isLoading = false;
  state.isSubmitted = true;
}
function submitFailed(state, action) {
  state.isLoading = false;
}

function checkListResponse(state, action) {
  state.isLoading = false;
  state.checkList = action.payload.checkList;
}

function resetProps(state, action) {
  state.isLoading = false;
  state.errorMessage = '';
  state.isSubmitted = false;
}
