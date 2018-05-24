import axios from 'axios';

import { CHANGE_BOOKING_STATUS } from '../common/types';

const updateBookingStatusAsync = (bookingStatus, eventId, index) => ({
  type: CHANGE_BOOKING_STATUS,
  payload: {
    bookingStatus,
    eventId,
    index,
  },
});

const updateBookingStatus = (bookingStatusData, eventId, index) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .put(`/api/v1/events/admin/${eventId}`, bookingStatusData)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      // console.log(bookingStatusData.bookingStatus);
      dispatch(updateBookingStatusAsync(bookingStatusData.bookingStatus, eventId, index));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default updateBookingStatus;
