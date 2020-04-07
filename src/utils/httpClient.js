import axios from 'axios';
import { actions as loginActions } from '../screens/LoginScreen';

const internals = {};
const UNAUTHORIZED = 401;

// create an instance of axios
const instance = axios.create({
  baseURL: 'http://45.117.168.169:8080',
  headers: { 'Content-Type': 'application/json' },
});

internals.get = (url, params, options) => {
  let config = {
    method: 'GET',
    url: url,
    params,
  };
  config = Object.assign(config, options);
  return instance(config)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('internals.get -> error', error);
      throw new Error(error);
    });
};

internals.post = (url, payload, options) => {
  let config = {
    method: 'POST',
    url: url,
    data: payload,
  };
  config = Object.assign(config, options);
  return instance(config)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('internals.post -> error', error);
      throw new Error(error);
    });
};

internals.put = (url, payload, options) => {
  let config = {
    method: 'PUT',
    url: url,
    data: payload,
  };
  config = Object.assign(config, options);
  return instance(config)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('internals.put -> error', error);
      throw new Error(error);
    });
};

export default internals;
// export { instance };

const setupInterceptors = store => {
  console.log('store', store);
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const { status } = error.response;
      console.log('status', status);
      if (status === UNAUTHORIZED) {
        store.dispatch(loginActions.logout());
      }
      return Promise.reject(error);
    },
  );
};

export { setupInterceptors };
