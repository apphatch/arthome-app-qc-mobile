import { httpClient } from '../../utils';
import { API_ENDPOINTS } from './constants';

export const fetchCheckList = ({ shopId }) => {
  return httpClient.get(`checklists/index_by_shop?shop_id=${shopId}`);
};

export const submitCheckListItemData = ({ itemId, data, token }) => {
  return httpClient.post(`${API_ENDPOINTS.checkListItems}/${itemId}`, data, {
    headers: { 'X-CSRF-Token': token },
  });
};
