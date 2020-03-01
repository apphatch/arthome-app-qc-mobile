import { httpClient } from '../../utils';
import { ENDPOINTS } from './constants';

export const login = ({ username, password }) => {
  return httpClient.post(ENDPOINTS.login, { username, password });
};
