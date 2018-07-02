import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  GET_ALL_CENTERS,
  GET_CENTERS_PAGE_NOS,
  CHECK_PAGE_LOADING_STATUS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches get all centers
 * @param {object} getAllCentersDetail
 * @returns {string} type
 * @returns {object} payload
 */
const getallCentersAsync = getAllCentersDetail => ({
  type: GET_ALL_CENTERS,
  payload: getAllCentersDetail,
});

/**
 * @description This dispatches get all centers meta data
 * @param {int} numOfPages
 * @param {int} totalNumOfPages
 * @returns {string} type
 * @returns {object} payload
 */
const getCenterPageNos = (numOfPages, totalNumOfPages, checkIfRecordExist) => ({
  type: GET_CENTERS_PAGE_NOS,
  payload: {
    numOfPages,
    totalNumOfPages,
    checkIfRecordExist,
  },
});

/**
 * @description This method gets all center from the database
 * @param {int} pageNo
 * @param {int} limitNo
 * @returns {promise}
 */
const getallCenters = (pageNo, limitNo) => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get(`/api/v1/centers/${pageNo}&${limitNo}`)
    .then((res) => {
      let checkIfRecordExist = false;
      if (res.data.centerDetails.length > 0) {
        checkIfRecordExist = true;
      }
      dispatch(getCenterPageNos(res.data.numOfPage, res.data.totalNumPage, checkIfRecordExist));
      dispatch(successMessage(SUCCESS_MESSAGE));
      dispatch(getallCentersAsync(res.data.centerDetails));
      dispatch(checkPageStatus(false));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};
export default getallCenters;
