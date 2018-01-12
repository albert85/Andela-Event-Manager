import axios from 'axios';

import { ADD_A_CENTER } from '../common/types';

const addNewCenterAsync = newCenterDetails => ({
  type: ADD_A_CENTER,
  payload: newCenterDetails,
});

const addNewCenter = newCenterDetails => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios
    .post('/api/v1/centers', newCenterDetails)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(addNewCenterAsync(newCenterDetails));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};

export default addNewCenter;
