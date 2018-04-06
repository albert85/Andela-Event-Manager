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
      // localStorage.setItem('message', res.data.message);
      dispatch(addNewEventAsync(res.data.eventDetails));

      // check if successfully added
      if (res.data.message === 'sucessfully created') {
        window.document.getElementById('dateAvailable').innerHTML = '';
        return window.document.getElementById('addEventForm').reset();
      }
    })
    .catch(() =>
      // localStorage.setItem('message', error.response.data.message);
      // check if the data is available
      window.document.getElementById('dateAvailable').innerHTML = 'Date not Available for booking' );
};

export default addNewEvent;
