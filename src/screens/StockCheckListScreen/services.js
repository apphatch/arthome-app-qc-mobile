import { httpClient } from '../../utils';
import { API_ENDPOINTS } from './constants';

export const fetchCheckList = ({ shopId }) => {
  return httpClient.get(`checklists/index_by_user_shop?shop_id=${shopId}`);
};

export const submitCheckListItemData = ({ itemId, data, token }) => {
  return httpClient.post(`${API_ENDPOINTS.checkListItems}/${itemId}`, data, {
    headers: { 'X-CSRF-Token': token },
  });
};

export const markDoneAll = ({ data, token, clId }) => {
  return httpClient.post(`checklists/${clId}/update_checklist_items`, data, {
    headers: { 'X-CSRF-Token': token },
  });
};

export const fetchStockByCheckList = ({ checkListId = 1, search = '' }) => {
  return httpClient.get(
    `checklists/${checkListId}/search_checklist_items?search_term=${search}`,
  );
};
