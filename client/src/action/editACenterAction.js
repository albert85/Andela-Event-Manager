import axios from 'axios';

import { EDIT_A_CENTER } from '../common/types';

const updateACenterAsync = (modifiedData, centerId) => ({
  type: EDIT_A_CENTER,
  payload: {
    modifiedData,
    centerId,
  },
});

const updateACenter = (modifiedData, centerId) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios
    .put(`/api/v1/centers/${centerId}`, modifiedData)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(updateACenterAsync(modifiedData, centerId));
      window.document.getElementById('addNewCenterFormEdit').reset();
    })
    .catch((error) => {
      localStorage.setItem('message', error.response.data.message);
    });
};
export default updateACenter;
