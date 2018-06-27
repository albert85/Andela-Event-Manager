import axios from 'axios';

import { DELETE_AN_EVENT } from '../common/types';

const deleteAnEventsAsync = eventId => ({
  type: DELETE_AN_EVENT,
  payload: eventId,
});

const deleteAnEvents = eventId => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .delete(`/api/v1/events/${eventId}`)
    .then(() => {
      dispatch(deleteAnEventsAsync(eventId));
    })
    .catch(error => localStorage.setItem('message', error.response.data.result));
};
export default deleteAnEvents;
