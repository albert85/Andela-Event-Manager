import axios from 'axios';
import toastr from 'toastr';

import { EDIT_AN_EVENT } from '../common/types';

// const CLIENT_ROOT_URL = process.env.ROOT_URL || 'http://localhost:8000';
// const CLIENT_ROOT_URL = 'https://andela-event-manager-app.herokuapp.com';

const updateAnEventsAsync = (modifiedData, eventId) => ({
  type: EDIT_AN_EVENT,
  payload: {
    modifiedData,
    eventId,
  },
});

const updateAnEvents = (modifiedData, eventId, history) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .put(`/api/v1/events/${eventId}`, modifiedData)
    .then((res) => {
      localStorage.setItem('message', res.data.result);
      
      dispatch(updateAnEventsAsync(modifiedData, eventId));
      if (res.data.result === 'sucessfully updated') {
        toastr.success('sucessfully updated');
        history.push('/event-home-page');
      }
    })
    .catch(() => {
      toastr.error('Date not Available for booking');
    });
};
export default updateAnEvents;
