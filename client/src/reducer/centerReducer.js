import { GET_ALL_CENTERS, ADD_A_CENTER, EDIT_A_CENTER } from '../common/types';

const centerMethodReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_A_CENTER:
      return [action.payload, ...state];
    case GET_ALL_CENTERS:
      return action.payload;
    case EDIT_A_CENTER:
      return state.map((center) => {
        if (center.id !== action.payload.centerId) {
          return center;
        }

        return Object.assign({}, center, action.payload.modifiedData);
      });
    default:
      return state;
  }
};

export default centerMethodReducer;
