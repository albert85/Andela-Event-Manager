import axios from 'axios';

import { ADD_AN_EVENT } from '../common/types';

const addNewEventAsync = newEventDetails => ({
  type: ADD_AN_EVENT,
  payload: newEventDetails,
});

const addNewEvent = newEventDetails => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios
    .post('/api/v1/events', newEventDetails)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(addNewEventAsync(res.data.eventDetails));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};

export default addNewEvent;
