import { createSelector } from 'reselect';

const selectShopDomain = () => state => state.shop;

const makeSelectIsLoading = () =>
  createSelector(selectShopDomain(), state => state.isLoading);

const makeSelectShops = () =>
  createSelector(selectShopDomain(), state => state.shops);

export { makeSelectIsLoading, makeSelectShops };
