import { httpClient } from '../../utils';
import { ENDPOINTS } from './constants';

export const checkOut = ({ formData, token, shopId }) => {
  return httpClient.post(ENDPOINTS.checkOut(shopId), formData, {
    headers: { 'X-CSRF-Token': token },
  });
};
