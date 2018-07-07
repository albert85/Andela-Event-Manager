import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  SEND_EMAILS,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches send mail to a user
 * @param {string} userEmailAddress
 * @returns {string} type
 * @returns {object} payload
 */
const sendEmailAsync = userEmailAddress => ({
  type: SEND_EMAILS,
  payload: userEmailAddress,
});

/**
 * @description This method sends email to a user
 * @param {string} userData
 * @returns {promise}
 */

const sendEmail = userEmailAddress => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .post('/api/v1/user/recipientEmail', userEmailAddress)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(sendEmailAsync(userEmailAddress));
      dispatch(successMessage(SUCCESS_MESSAGE));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};

export default sendEmail;
