import {
  CHECK_PAGE_LOADING_STATUS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '../common/types';

const defaultState = {
  checkStatus: {
    isLoading: false,
    success: false,
    error: false,
  },
};

const messageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return {
        ...state,
        checkStatus: {
          isLoading: false,
          success: true,
          error: false,
        },
      };
    case CHECK_PAGE_LOADING_STATUS:
      return {
        ...state,
        checkStatus: {
          isLoading: true,
          success: false,
          error: false,
        },
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        checkStatus: {
          isLoading: false,
          success: false,
          error: true,
        },
      };
    default:
      return state;
  }
};

export default messageReducer;
