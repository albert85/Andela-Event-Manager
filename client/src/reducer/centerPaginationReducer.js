import { GET_CENTERS_PAGE_NOS } from '../common/types';


const centerPaginationReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CENTERS_PAGE_NOS:
      return action.payload;
    default:
      return state;
  }
};

export default centerPaginationReducer;
