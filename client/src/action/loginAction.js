import axios from 'axios';
import toastr from 'toastr';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  LOGIN_USER,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches login a user
 * @param {object} userData
 * @returns {string} type
 * @returns {object} payload
 */
const loginUserAsync = userData => ({
  type: LOGIN_USER,
  payload: userData,
});

/**
 * @description This method login a user
 * @param {object} userData
 * @param {object} history
 * @returns {promise}
 */
const loginUser = (userData, history) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  return axios
    .post('/api/v1/user/login', userData)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userIdNo', res.data.userIdNo);
      localStorage.setItem('role', res.data.role);

      dispatch(loginUserAsync(res.data.result));
      dispatch(successMessage(SUCCESS_MESSAGE));

      if (res.data.result === 'successfully login') {
        if (res.data.role === 'Admin') {
          history.push('/centers');
        } else {
          history.push('/event-home-page');
        }
      }
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
      toastr.error('Wrong password and email');
      toastr.clear();
    });
};
export default loginUser;
