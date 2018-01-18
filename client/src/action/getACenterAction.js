import axios from 'axios';

import { VIEW_A_CENTER } from '../common/types';

const getACentersAsync = eventDetails => ({
  type: VIEW_A_CENTER,
  payload: eventDetails,
});

const getACenter = centerId => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios
    .get(`/api/v1/centers/${centerId}`)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(getACentersAsync(res.data.eventDetails));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default getACenter;
