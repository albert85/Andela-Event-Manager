import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  GET_USER_ALL_EVENTS,
  GET_EVENTS_PAGE_NOS,
  CHECK_PAGE_LOADING_STATUS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatch get all events of a particualr user
 * @param {object} getAllEventsDetail
 * @returns {string} type
 * @returns {object} payload
 */
const getAllUserEventsAsync = getAllEventsDetail => ({
  type: GET_USER_ALL_EVENTS,
  payload: getAllEventsDetail,
});

/**
 * @description This dispatches meta data details of all events
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
 * @description This method get all events of a particular user
 * @param {int} centerId
 * @param {int} userIdNo
 * @param {int} pageNo
 * @returns {promise}
 */

const getAllUserEvents = (centerId, userIdNo, pageNo) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  return axios
    .get(`/api/v1/user/events/${centerId}/${userIdNo}/${pageNo}&${4}`)
    .then((res) => {
      const { eventDetails, numOfPage, totalCount } = res.data;
      let recordExist = false;

      if (eventDetails.length > 0) {
        recordExist = true;
      }

      dispatch(getAllUserEventsAsync(eventDetails));
      dispatch(getEventPageNos(numOfPage, totalCount, recordExist));
      localStorage.setItem('PageNos', res.data.numOfPage);
      dispatch(successMessage(SUCCESS_MESSAGE));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};

export default getAllUserEvents;
