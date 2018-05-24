import axios from 'axios';

import { GET_ALL_CENTERS } from '../common/types';

const getallCentersAsync = getAllCentersDetail => ({
  type: GET_ALL_CENTERS,
  payload: getAllCentersDetail,
});

const getallCenters = getAllCentersDetail => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get('/api/v1/centers')
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(getallCentersAsync(res.data.centerDetails));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default getallCenters;
