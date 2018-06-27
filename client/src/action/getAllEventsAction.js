import axios from 'axios';

import {
  GET_ALL_EVENTS,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
  GET_EVENTS_PAGE_NOS,
} from '../common/types';

const getallEventsAsync = (getAllEventsDetail, numOfPages) => ({
  type: GET_ALL_EVENTS,
  payload: getAllEventsDetail,
  numOfPages,
});

const getEventPageNos = (numOfPages, totalNumOfPages, checkIfRecordExist) => ({
  type: GET_EVENTS_PAGE_NOS,
  payload: {
    numOfPages,
    totalNumOfPages,
    checkIfRecordExist,
  },
});

export const checkPageStatus = type => ({
  type,
});

export const successMessage = type => ({
  type,
});

export const errorMessage = type => ({
  type,
});

const getallEvents = (centerId, pageNo) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get(`/api/v1/events/${centerId}/${pageNo}&${5}`)
    .then((res) => {
      let checkIfRecordExist = false;
      if (res.data.eventDetails.length > 0) {
        checkIfRecordExist = true;
      }
      dispatch(getallEventsAsync(res.data.eventDetails, res.data.numOfPage));
      dispatch(getEventPageNos(res.data.numOfPage, res.data.totalNumOfEvent, checkIfRecordExist));
      dispatch(successMessage(SUCCESS_MESSAGE));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};
export default getallEvents;
