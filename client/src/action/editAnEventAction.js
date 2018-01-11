import axios from 'axios';

import { EDIT_AN_EVENT } from '../common/types';

const updateAnEventsAsync = (modifiedData, eventId) => ({
  type: EDIT_AN_EVENT,
  payload: {
    modifiedData,
    eventId,
  },
});

const updateAnEvents = (modifiedData, eventId) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios
    .put(`/api/v1/events/${eventId}`, modifiedData)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(updateAnEventsAsync(modifiedData, eventId));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default updateAnEvents;
