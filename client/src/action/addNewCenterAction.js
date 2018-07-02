import axios from 'axios';
import toastr from 'toastr';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  ADD_A_CENTER,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches adding a center
 * @param {object} newCenterDetails
 * @returns {string} type
 * @returns {object} payload
 */
const addNewCenterAsync = newCenterDetails => ({
  type: ADD_A_CENTER,
  payload: newCenterDetails,
});

/**
 * @description This method create a center to the database
 * @param {object} newCenterDetails
 * @returns {promise}
 */

const addNewCenter = newCenterDetails => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .post('/api/v1/centers', newCenterDetails)
    .then((res) => {
      dispatch(addNewCenterAsync(newCenterDetails));
      dispatch(successMessage(SUCCESS_MESSAGE));
      localStorage.setItem('message', res.data.result);
      toastr.success('successfully added');
      toastr.clear();
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
      toastr.error('Credential exist');
      toastr.clear();
    });
};

export default addNewCenter;
