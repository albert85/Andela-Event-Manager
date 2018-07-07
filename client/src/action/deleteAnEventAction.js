import axios from 'axios';

import {
  DELETE_AN_EVENT,
  SUCCESS_MESSAGE,
  CHECK_PAGE_LOADING_STATUS,
  ERROR_MESSAGE,
} from '../common/types';

/**
 * @description This dispatches delete an event
 * @param {int} eventId
 * @returns {string} type
 * @returns {object} payload
 */
const deleteAnEventsAsync = eventId => ({
  type: DELETE_AN_EVENT,
  payload: eventId,
});

/**
 * @description This dispatches status loading
 * @param {string} type
 * @returns {string} type
 */
export const checkPageStatus = type => ({
  type,
});

/**
 * @description This dispatches success messages
 * @param {string} type
 * @returns {string} type
 */
export const successMessage = type => ({
  type,
});

/**
 * @description This dispatches error messages
 * @param {string} type
 * @returns {string} type
 */
export const errorMessage = type => ({
  type,
});

/**
 * @description This method deletes events in the database
 * @param {int} eventId
 * @returns {promise}
 */


const deleteAnEvents = eventId => (dispatch) => {
  dispatch(checkPageStatus(CHECK_PAGE_LOADING_STATUS));
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios
    .delete(`/api/v1/events/${eventId}`)
    .then(() => {
      dispatch(deleteAnEventsAsync(eventId));
      dispatch(successMessage(SUCCESS_MESSAGE));
    })
    .catch(() => {
      dispatch(errorMessage(ERROR_MESSAGE));
    });
};
export default deleteAnEvents;
