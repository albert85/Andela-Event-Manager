import axios from 'axios';
import toastr from 'toastr';

import { ADD_A_CENTER } from '../common/types';

const addNewCenterAsync = newCenterDetails => ({
  type: ADD_A_CENTER,
  payload: newCenterDetails,
});

const addNewCenter = (newCenterDetails, history) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .post('/api/v1/centers', newCenterDetails)
    .then((res) => {
      dispatch(addNewCenterAsync(newCenterDetails));
      localStorage.setItem('message', res.data.result);
      toastr.success('successfully added');
    })
    .catch(() => {
      toastr.error('Credential exist');
    });
};

export default addNewCenter;
