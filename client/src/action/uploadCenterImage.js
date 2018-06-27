import axios from 'axios';

import { UPLOAD_IMAGE, CHECK_PAGE_LOADING_STATUS, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../common/types';

const uploadImageAsync = imageUrl => ({
  type: UPLOAD_IMAGE,
  payload: imageUrl,
});

const checkPageStatus = loading => ({
  type: CHECK_PAGE_LOADING_STATUS,
  payload: loading,
});

// const successMessage = checkStatus => ({
//   type: SUCCESS_MESSAGE,
//   payload: checkStatus,
// });

// const errorMessage = checkStatus => ({
//   type: ERROR_MESSAGE,
//   payload: checkStatus,
// });

// /api/v1/center/:centerId/:page&:limit
const uploadImage = centerData => dispatch =>
  // dispatch(checkPageStatus(true));
//   axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios({
    url: process.env.CLOUDINARY_URL,
    method: 'POST',
    transformRequest: [(data, headers) => {
      delete headers.common.Authorization;
      return data;
    }],
    headers: {

      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: centerData,
  })
    .then((res) => {
      dispatch(uploadImageAsync(res.data.secure_url));
      // dispatch(checkPageStatus(false));
      return res.data.secure_url;
    })
    .catch(error => window.console.log('message', error.response));
export default uploadImage;
