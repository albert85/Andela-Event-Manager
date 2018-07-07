import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  CHANGE_BOOKING_STATUS,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches cancels event booking
 * @param {int} bookingStatus
 * @param {int} eventId
 * @param {int} index
 * @returns {string} type
 * @returns {object} payload
 */
const updateBookingStatusAsync = (bookingStatus, eventId, index) => ({
  type: CHANGE_BOOKING_STATUS,
  payload: {
    bookingStatus,
    eventId,
    index,
  },
});

/**
 * @description This method add new user to the database
 * @param {int} bookingStatus
 * @param {int} eventId
 * @param {int} index
 * @returns {promise}
 */
const updateBookingStatus = (bookingStatusData, eventId, index) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .put(`/api/v1/events/admin/${eventId}`, bookingStatusData)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(updateBookingStatusAsync(bookingStatusData.bookingStatus, eventId, index));
      dispatch(successMessage(SUCCESS_MESSAGE));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};
export default updateBookingStatus;
