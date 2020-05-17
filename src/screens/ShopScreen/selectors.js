import { createSelector } from 'reselect';

const selectShopDomain = () => state => state.shop;

const makeSelectIsLoading = () =>
  createSelector(
    selectShopDomain(),
    state => state.isLoading,
  );

const makeSelectShops = () =>
  createSelector(
    selectShopDomain(),
    state => state.shops,
  );
const makeSelectShopById = shopId =>
  createSelector(
    makeSelectShops(),
    shops => shops.filter(shop => shop.id === shopId)[0],
  );

export { makeSelectIsLoading, makeSelectShops, makeSelectShopById };
