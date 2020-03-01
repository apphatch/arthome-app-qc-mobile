import { all, fork } from 'redux-saga/effects';

import { saga as loginSaga } from '../screens/LoginScreen';
import { shopSaga } from '../screens/ShopScreen';
import { stockSaga } from '../screens/StockScreen';

const rootSaga = function* rootSaga() {
  yield all(
    [
      loginSaga(),
      shopSaga(),
      stockSaga(),
      // sagas
    ].map(saga => fork(saga)),
  );
};

export default rootSaga;
