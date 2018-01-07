import axios from 'axios';

import { GET_ALL_EVENTS } from '../common/types';

const getallEventsAsync = getAllEventsDetail => ({
  type: GET_ALL_EVENTS,
  payload: getAllEventsDetail,
});

const getallEvents = getAllEventsDetail => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios
    .get('/api/v1/events')
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(getallEventsAsync(res.data.eventDetails));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default getallEvents;
