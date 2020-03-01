import { createSelector } from 'reselect';

const selectLoginDomain = () => state => state.login;

const makeSelectIsLoading = () =>
  createSelector(selectLoginDomain(), state => state.isLoading);

const makeSelectIsLoggedIn = () =>
  createSelector(selectLoginDomain(), state => state.isLoggedIn);

export { makeSelectIsLoading, makeSelectIsLoggedIn };
