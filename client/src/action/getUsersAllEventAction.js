import axios from 'axios';

import {
  GET_USER_ALL_EVENTS,
  GET_EVENTS_PAGE_NOS,
  CHECK_PAGE_LOADING_STATUS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '../common/types';

const getAllUserEventsAsync = getAllEventsDetail => ({
  type: GET_USER_ALL_EVENTS,
  payload: getAllEventsDetail,
});

const getEventPageNos = (numOfPages, totalNumOfPages, checkIfRecordExist) => ({
  type: GET_EVENTS_PAGE_NOS,
  payload: {
    numOfPages,
    totalNumOfPages,
    checkIfRecordExist,
  },
});

const checkPageStatus = loading => ({
  type: CHECK_PAGE_LOADING_STATUS,
  payload: loading,
});

const successMessage = checkStatus => ({
  type: SUCCESS_MESSAGE,
  payload: checkStatus,
});

const errorMessage = checkStatus => ({
  type: ERROR_MESSAGE,
  payload: checkStatus,
});

const getAllUserEvents = (centerId, userIdNo, pageNo) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  dispatch(checkPageStatus(true));
  return axios
    .get(`/api/v1/user/events/${centerId}/${userIdNo}/${pageNo}&${4}`)
    .then((res) => {
      const { eventDetails, numOfPage, totalCount } = res.data;
      // localStorage.setItem('message', res.data.result);
      let recordExist = false;
      if (eventDetails.length > 0) {
        recordExist = true;
      }
      dispatch(successMessage(true));
      dispatch(getEventPageNos(numOfPage, totalCount, recordExist));
      localStorage.setItem('PageNos', res.data.numOfPage);
      dispatch(getAllUserEventsAsync(eventDetails));
      dispatch(checkPageStatus(false));
    })
    .catch(error => dispatch(errorMessage(error.response.data.success)));
};
export default getAllUserEvents;
