import axios from 'axios';

import { checkPageStatus, successMessage, errorMessage } from '../common/DispatchMessage';
import {
  UPLOAD_IMAGE,
  CHECK_PAGE_LOADING_STATUS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches upload image to cloudinary
 * @param {string} imageUrl
 * @returns {string} type
 * @returns {object} payload
 */
const uploadImageAsync = imageUrl => ({
  type: UPLOAD_IMAGE,
  payload: imageUrl,
});

/**
 * @description This method sends image to cloudinary
 * @param {object} centerData
 * @returns {promise}
 */

const uploadImage = centerData => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  return axios({
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
      dispatch(successMessage(SUCCESS_MESSAGE));
      return res.data.secure_url;
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};

export default uploadImage;
