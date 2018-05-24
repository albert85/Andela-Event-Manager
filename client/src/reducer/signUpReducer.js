import { ADD_NEW_USER } from '../common/types';

const newUserReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      return {
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default newUserReducer;
