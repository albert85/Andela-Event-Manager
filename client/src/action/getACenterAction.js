import axios from 'axios';

import { VIEW_A_CENTER, GET_EVENTS_PAGE_NOS } from '../common/types';

const getACentersAsync = eventDetails => ({
  type: VIEW_A_CENTER,
  payload: eventDetails,
});

const getCenterPageNos = (numOfPages, totalNumOfPages) => ({
  type: GET_EVENTS_PAGE_NOS,
  payload: {
    numOfPages,
    totalNumOfPages,
  },
});
// call an APi that will get all events and date of a particular event center
const getACenter = (centerId, pageNo) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get(`/api/v1/center/${centerId}/${pageNo}&${5}`)
    .then((res) => {
      dispatch(getACentersAsync(res.data.eventDetail));
      dispatch(getCenterPageNos(res.data.numOfPage, res.data.totalNumPage));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default getACenter;
