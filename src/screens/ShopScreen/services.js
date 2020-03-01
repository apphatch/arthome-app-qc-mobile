import { httpClient } from '../../utils';
import { ENDPOINTS } from './constants';

export const fetchShops = () => {
  return httpClient.get(ENDPOINTS.shop);
};
