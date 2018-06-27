import axios from 'axios';

import {
  GET_ALL_CENTERS,
  GET_CENTERS_PAGE_NOS,
  CHECK_PAGE_LOADING_STATUS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '../common/types';

const getallCentersAsync = getAllCentersDetail => ({
  type: GET_ALL_CENTERS,
  payload: getAllCentersDetail,
});

const getCenterPageNos = (numOfPages, totalNumOfPages) => ({
  type: GET_CENTERS_PAGE_NOS,
  payload: {
    numOfPages,
    totalNumOfPages,
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

const getallCenters = (pageNo, limitNo) => (dispatch) => {
  dispatch(checkPageStatus(true));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .get(`/api/v1/centers/${pageNo}&${limitNo}`)
    .then((res) => {
      localStorage.setItem('message', res.data.success);
      dispatch(getCenterPageNos(res.data.numOfPage, res.data.totalNumPage));
      dispatch(successMessage(res.data.success));
      dispatch(getallCentersAsync(res.data.centerDetails));
      dispatch(checkPageStatus(false));
    })
    .catch((error) => {
      // localStorage.setItem('message', error.response.data.success);
      dispatch(errorMessage(error.response.data.success));
    });
};
export default getallCenters;
