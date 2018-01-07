import { GET_ALL_CENTERS } from '../common/types';

const centerMethodReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CENTERS:
      return action.payload;
    default:
      return state;
  }
};

export default centerMethodReducer;
