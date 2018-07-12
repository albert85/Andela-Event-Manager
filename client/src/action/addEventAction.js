import axios from 'axios';
import toastr from 'toastr';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  ADD_AN_EVENT,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches adding new event details
 * @param {object} newEventDetails
 * @returns {string} type
 * @returns {object} payload
 */

export const addNewEventAsync = newEventDetails => ({
  type: ADD_AN_EVENT,
  payload: newEventDetails,
});

/**
 * @description This dispatches adding new events
 * @param {object} newEventDetails
 * @returns {promise}
 */

const addNewEvent = newEventDetails => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .post('/api/v1/events', newEventDetails)
    .then((res) => {
      dispatch(addNewEventAsync(res.data.eventDetails));
      dispatch(successMessage(SUCCESS_MESSAGE));
      toastr.success('sucessfully created');
      toastr.clear();
      return res.data.success;
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
      // check if the data is available
      toastr.error('Date not Available for booking');
      toastr.clear();
    });
};

export default addNewEvent;
