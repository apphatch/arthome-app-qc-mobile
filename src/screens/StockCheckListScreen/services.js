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

export const markDoneAll = ({ clId }) => {
  return httpClient.get(`checklists/${clId}/show_incomplete_items`);
};

export const fetchStockByCheckList = ({ checkListId = 1, search = '' }) => {
  return httpClient.get(
    `stocks/search_by_checklist?checklist_id=${checkListId}&search_term=${search}`,
  );
};
