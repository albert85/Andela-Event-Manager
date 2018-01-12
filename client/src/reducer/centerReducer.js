import { GET_ALL_CENTERS, ADD_A_CENTER } from '../common/types';

const centerMethodReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_A_CENTER:
      return [action.payload, ...state];
    case GET_ALL_CENTERS:
      return action.payload;
    default:
      return state;
  }
};

export default centerMethodReducer;
