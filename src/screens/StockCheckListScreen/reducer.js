import { createReducer } from '../../utils';
import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  errorMessage: '',
  checkList: [],
};

const handlers = {
  [actionTypes.SUBMIT]: submit,
  [actionTypes.SUBMIT_SUCCESS]: submitSuccess,
  [actionTypes.SUBMIT_FAILED]: submitFailed,

  [actionTypes.CHECK_LIST_RESPONSE]: checkListResponse,
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

function checkListResponse(state, action) {
  state.isLoading = false;
  state.checkList = action.payload.checkList;
}
