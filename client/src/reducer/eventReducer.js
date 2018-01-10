import { ADD_AN_EVENT, GET_ALL_EVENTS, EDIT_AN_EVENT, DELETE_AN_EVENT } from '../common/types';

const eventMethodReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_AN_EVENT:
      return [action.payload, ...state];
    case EDIT_AN_EVENT:
      return state.map((event) => {
        if (event.id === action.payload.eventId) {
          return action.payload.modifiedData;
        }
        return event;
      });
    case GET_ALL_EVENTS:
      return action.payload;
    case DELETE_AN_EVENT:
      return state.filter(event => event.id !== action.payload);
    default:
      return state;
  }
};

export default eventMethodReducer;
