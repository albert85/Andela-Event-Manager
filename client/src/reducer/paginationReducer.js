import { GET_EVENTS_PAGE_NOS } from '../common/types';


const paginationReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS_PAGE_NOS:
      return action.payload;
    default:
      return state;
  }
};

export default paginationReducer;

