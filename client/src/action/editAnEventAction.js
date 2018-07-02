import axios from 'axios';
import toastr from 'toastr';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  EDIT_AN_EVENT,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';


/**
 * @description This dispatches updates events details
 * @param {object} modifiedData
 * @param {int} eventId
 * @returns {object} payload
 */

const updateAnEventsAsync = (modifiedData, eventId) => ({
  type: EDIT_AN_EVENT,
  payload: {
    modifiedData,
    eventId,
  },
});

/**
 * @description This method updates events in the database
 * @param {object} modifiedData
 * @param {int} eventId
 * @param {object} history
 * @returns {promise}
 */
const updateAnEvents = (modifiedData, eventId, history) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .put(`/api/v1/events/${eventId}`, modifiedData)
    .then((res) => {
      localStorage.setItem('message', res.data.result);

      dispatch(updateAnEventsAsync(modifiedData, eventId));
      dispatch(successMessage(SUCCESS_MESSAGE));
      
      if (res.data.result === 'sucessfully updated') {
        toastr.success('sucessfully updated');
        history.push('/event-home-page');
      }
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
      toastr.error('Date not Available for booking');
    });
};
export default updateAnEvents;
