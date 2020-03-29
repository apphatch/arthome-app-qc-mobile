import { httpClient } from '../../utils';
import { ENDPOINTS } from './constants';

export const checkIn = ({ formData, token, shopId }) => {
  const endpoint = ENDPOINTS.checkIn(shopId);
  return httpClient.post(endpoint, formData, {
    headers: { 'X-CSRF-Token': token },
  });
};

export const checkOut = ({ formData, token, shopId }) => {
  const endpoint = ENDPOINTS.checkOut(shopId);
  return httpClient.post(endpoint, formData, {
    headers: { 'X-CSRF-Token': token },
  });
};
