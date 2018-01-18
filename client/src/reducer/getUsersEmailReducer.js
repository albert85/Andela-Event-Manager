import { GET_ALL_EMAILS } from '../common/types';

const getUsersEmailReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_EMAILS:
      return action.payload;
    default:
      return state;
  }
};

export default getUsersEmailReducer;
