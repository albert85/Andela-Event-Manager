import axios from 'axios';
import toastr from 'toastr';

import { ADD_AN_EVENT } from '../common/types';

export const addNewEventAsync = newEventDetails => ({
  type: ADD_AN_EVENT,
  payload: newEventDetails,
});

const addNewEvent = newEventDetails => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .post('/api/v1/events', newEventDetails)
    .then((res) => {
      // localStorage.setItem('message', res.data.message);
      dispatch(addNewEventAsync(res.data.eventDetails));

      toastr.success('sucessfully created');
    })
    .catch(() => {
      // check if the data is available
      toastr.error('Date not Available for booking');
    });
};

export default addNewEvent;
