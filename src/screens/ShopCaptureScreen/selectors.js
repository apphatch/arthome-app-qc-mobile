import { createSelector } from 'reselect';

const selectCheckInDomain = () => state => state.shopCap;

const makeSelectIsLoading = () =>
  createSelector(
    selectCheckInDomain(),
    state => state.isLoading,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectCheckInDomain(),
    state => state.errorMessage,
  );

export { makeSelectIsLoading, makeSelectErrorMessage };
