import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './reducers';
import rootSagas from './sagas';

// const storage = createSensitiveStorage({
//   keychainService: 'myKeychain',
//   sharedPreferencesName: 'mySharedPrefs',
// });

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['stock'],
  debug: true, //to get useful logging,
  version: 2,
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistReducer(config, rootReducers());
const enhancers = [applyMiddleware(...middleware)];
const store = createStore(reducers, undefined, compose(...enhancers));

const persistor = persistStore(store);
const configureStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(rootSagas);

export default configureStore;
