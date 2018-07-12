import axios from 'axios';
import toastr from 'toastr';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  EDIT_A_CENTER,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches updates a center details
 * @param {object} modifiedData
 * @param {int} centerId
 * @returns {string} type
 * @returns {object} payload
 */
const updateACenterAsync = (modifiedData, centerId) => ({
  type: EDIT_A_CENTER,
  payload: {
    modifiedData,
    centerId,
  },
});

/**
 * @description This method updates center details in the database
 * @param {object} modifiedData
 * @param {int} centerId
 * @returns {promise}
 */

const updateACenter = (modifiedData, centerId) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .put(`/api/v1/centers/${centerId}`, modifiedData)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(updateACenterAsync(modifiedData, centerId));
      dispatch(successMessage(SUCCESS_MESSAGE));
      toastr.success('Successfully updated');
      toastr.clear();
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
      toastr.error('Please check the details you supplied');
    });
};
export default updateACenter;
