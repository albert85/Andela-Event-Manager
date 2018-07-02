import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  SEARCH_CENTER,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches search for a center
 * @param {object} userData
 * @returns {string} type
 * @returns {object} payload
 */
const searchACenterAsync = CenterDetails => ({
  type: SEARCH_CENTER,
  payload: CenterDetails,
});

/**
 * @description This method search for a center
 * @param {object} CenterToSearch
 * @returns {promise}
 */
const searchACenter = CenterToSearch => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .post('/api/v1/center/search', CenterToSearch)
    .then((res) => {
      dispatch(searchACenterAsync(res.data.center));
      dispatch(successMessage(SUCCESS_MESSAGE));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};

export default searchACenter;
