import axios from 'axios';

import { SEARCH_CENTER } from '../common/types';

const searchACenterAsync = CenterDetails => ({
  type: SEARCH_CENTER,
  payload: CenterDetails,
});

const searchACenter = CenterToSearch => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .post('/api/v1/center/search', CenterToSearch)
    .then((res) => {
      dispatch(searchACenterAsync(res.data.center));
      localStorage.setItem('message', res.data.result);
      // toastr.success('successfully added');
      // history.push('')
    })
    .catch(() => {
      // toastr.error('Record does not exist');
    });
};

export default searchACenter;
