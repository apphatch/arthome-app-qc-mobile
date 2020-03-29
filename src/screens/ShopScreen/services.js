import { httpClient } from '../../utils';
import { ENDPOINTS } from './constants';

export const fetchShops = ({ userId }) => {
  return httpClient.get(`${ENDPOINTS.shop}?user_id=${userId}`);
};
