import { UPLOAD_IMAGE } from '../common/types';

const loginUserReducer = (state = { imageUrl: '' }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return { imageUrl: action.payload };
    default:
      return state;
  }
};

export default loginUserReducer;
