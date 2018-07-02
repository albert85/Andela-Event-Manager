import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  GET_ALL_EMAILS,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches get all email of user
 * @param {object} getAllUsersEmailDetail
 * @returns {string} type
 * @returns {object} payload
 */
const getEmailAsync = getAllUsersEmailDetail => ({
  type: GET_ALL_EMAILS,
  payload: getAllUsersEmailDetail,
});

/**
 * @description This dispatches get the email of users
 * @param {int} userId
 * @returns {promise}
 */
const getallUsersEmail = userId => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get(`/api/v1/user/email/${userId}`)
    .then((res) => {
      localStorage.setItem('message', res.data.success);
      dispatch(getEmailAsync(res.data.userEmail));
      dispatch(successMessage(SUCCESS_MESSAGE));
      return res.data.userEmail;
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};
export default getallUsersEmail;
