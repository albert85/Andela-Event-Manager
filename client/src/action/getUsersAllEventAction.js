import axios from 'axios';

import { GET_USER_ALL_EVENTS } from '../common/types';

const getAllUserEventsAsync = getAllEventsDetail => ({
  type: GET_USER_ALL_EVENTS,
  payload: getAllEventsDetail,
});

const getAllUserEvents = userIdNo => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get(`/api/v1/user/events/${userIdNo}`)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(getAllUserEventsAsync(res.data.eventDetails));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default getAllUserEvents;
