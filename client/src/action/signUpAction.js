import axios from 'axios';
import toastr from 'toastr';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  ADD_NEW_USER,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches add new user
 * @param {object} userData
 * @returns {string} type
 * @returns {object} payload
 */

export const addNewUserAsync = userData => ({
  type: ADD_NEW_USER,
  payload: userData,
});

/**
 * @description This method add new user to the database
 * @param {object} userData
 * @param {object} history
 * @returns {promise}
 */

const addNewUser = (userData, history) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  return axios
    .post('/api/v1/users/signUp', userData)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      const {
        firstName, lastName, email, message,
      } = res.data;

      toastr.success('Account successfully created');

      dispatch(addNewUserAsync({
        firstName, lastName, email, message,
      }));
      dispatch(successMessage(SUCCESS_MESSAGE));
      history.push('/');
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
      toastr.warning('Email Already Registered to an Account');
    });
};
export default addNewUser;
