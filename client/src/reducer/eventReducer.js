import { ADD_AN_EVENT, GET_ALL_EVENTS, EDIT_AN_EVENT, DELETE_AN_EVENT } from '../common/types';

const eventMethodReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_AN_EVENT:
      return [action.payload, ...state];
    case GET_ALL_EVENTS:
      return action.payload;
    default:
      return state;
  }
};

export default eventMethodReducer;
