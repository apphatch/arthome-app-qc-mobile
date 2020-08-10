import { all, fork } from 'redux-saga/effects';

import { saga as loginSaga } from '../screens/LoginScreen';
import { shopSaga } from '../screens/ShopScreen';
import { stockSaga } from '../screens/StockScreen';
import { stockCheckListSaga } from '../screens/StockCheckListScreen';
import { shopCaptureSaga } from '../screens/ShopCaptureScreen';

const rootSaga = function* rootSaga() {
  yield all(
    [
      loginSaga(),
      shopSaga(),
      stockSaga(),
      stockCheckListSaga(),
      shopCaptureSaga(),
      // sagas
    ].map((saga) => fork(saga)),
  );
};

export default rootSaga;
