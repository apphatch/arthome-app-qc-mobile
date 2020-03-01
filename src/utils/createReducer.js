import createNextState from 'immer';

function createReducerImmer(initialState, actionsMap) {
  return function reducer(state = initialState, action) {
    return createNextState(state, draft => {
      const caseReducer = actionsMap[action.type];
      return caseReducer ? caseReducer(draft, action) : undefined;
    });
  };
}

export default createReducerImmer;
