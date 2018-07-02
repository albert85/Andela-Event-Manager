import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  VIEW_A_CENTER,
  GET_EVENTS_PAGE_NOS,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches get a center
 * @param {object} eventDetails
 * @returns {string} type
 * @returns {object} payload
 */
const getACentersAsync = eventDetails => ({
  type: VIEW_A_CENTER,
  payload: eventDetails,
});

/**
 * @description This dispatches get meta information for the event
 * @param {int} numOfPages
 * @param {int} totalNumOfPages
 * @returns {string} type
 * @returns {object} payload
 */
const getCenterPageNos = (numOfPages, totalNumOfPages) => ({
  type: GET_EVENTS_PAGE_NOS,
  payload: {
    numOfPages,
    totalNumOfPages,
  },
});
// call an APi that will get all events and date of a particular event center
const getACenter = (centerId, pageNo) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get(`/api/v1/center/${centerId}/${pageNo}&${5}`)
    .then((res) => {
      dispatch(getACentersAsync(res.data.eventDetail));
      dispatch(getCenterPageNos(res.data.numOfPage, res.data.totalNumPage));
      dispatch(successMessage(SUCCESS_MESSAGE));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};
export default getACenter;
