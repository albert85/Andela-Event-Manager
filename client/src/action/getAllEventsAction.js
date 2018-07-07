import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  GET_ALL_EVENTS,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
  GET_EVENTS_PAGE_NOS,
} from '../common/types';

/**
 * @description This dispatches get all events
 * @param {object} getAllEventsDetail
 * @param {int} numOfPages
 * @returns {string} type
 * @returns {object} payload
 * @returns {int} numOfPages
 */
const getallEventsAsync = (getAllEventsDetail, numOfPages) => ({
  type: GET_ALL_EVENTS,
  payload: getAllEventsDetail,
  numOfPages,
});

/**
 * @description This dispatches get all events meta data
 * @param {int} numOfPages
 * @param {int} totalNumOfPages
 * @param {boolean} checkIfRecordExist
 * @returns {string} type
 * @returns {object} payload
 */
const getEventPageNos = (numOfPages, totalNumOfPages, checkIfRecordExist) => ({
  type: GET_EVENTS_PAGE_NOS,
  payload: {
    numOfPages,
    totalNumOfPages,
    checkIfRecordExist,
  },
});

/**
 * @description This method get all events from the database
 * @param {int} centerId
 * @param {int} pageNo
 * @returns {promise}
 */
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
