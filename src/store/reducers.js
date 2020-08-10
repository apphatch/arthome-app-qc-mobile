import { combineReducers } from 'redux';

import { loginReducer } from '../screens/LoginScreen';
import { shopReducer } from '../screens/ShopScreen';
// import { stockReducer } from '../screens/StockScreen';
import { stockCheckListReducer } from '../screens/StockCheckListScreen';
import { shopCaptureReducer } from '../screens/ShopCaptureScreen';

export default function createRootReducer() {
  return combineReducers({
    login: loginReducer,
    shop: shopReducer,
    // stock: stockReducer,
    stockCheckList: stockCheckListReducer,
    shopCap: shopCaptureReducer,
  });
}
