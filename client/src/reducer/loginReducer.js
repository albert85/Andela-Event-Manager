import { LOGIN_USER } from '../common/types';

const loginUserReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    default:
      return state;
  }
};

export default loginUserReducer;
