import { httpClient } from '../../utils';

export const fetchCheckList = ({ shopId }) => {
  return httpClient.get(`checklists/index_by_shop?shop_id=${shopId}`);
};

// export const logout = () => {
//   return httpClient.get(ENDPOINTS.logout, {});
// };
