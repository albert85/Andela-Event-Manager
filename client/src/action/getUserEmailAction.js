import axios from 'axios';

import { GET_ALL_EMAILS } from '../common/types';

const getallCentersAsync = getAllUsersEmailDetail => ({
  type: GET_ALL_EMAILS,
  payload: getAllUsersEmailDetail,
});

const getallUsersEmail = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get('/api/v1/user/email')
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(getallCentersAsync(res.data.result));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default getallUsersEmail;
