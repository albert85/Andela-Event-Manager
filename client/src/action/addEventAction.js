import axios from 'axios';

import { ADD_AN_EVENT } from '../common/types';

const addNewEventAsync = newEventDetails => ({
  type: ADD_AN_EVENT,
  payload: newEventDetails,
});

const addNewEvent = newEventDetails => (dispatch) => {
  axios
.post('/api/v1/events', newEventDetails)
.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    .then((res) => {
      localStorage.setItem('message', res.data.message);    
      dispatch(addNewEventAsync(newEventDetails));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default addNewEvent;
