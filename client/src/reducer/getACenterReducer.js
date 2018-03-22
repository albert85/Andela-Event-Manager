import { VIEW_A_CENTER, CHANGE_BOOKING_STATUS } from '../common/types';

const getACenterReducer = (state = [], action) => {
  switch (action.type) {
    case VIEW_A_CENTER:
      return action.payload;
    case CHANGE_BOOKING_STATUS:
      return state.map((event) => {
        if (event.id !== action.payload.index) {
          return event;
        }
        return Object.assign({}, event, {
          bookingStatus: action.payload.bookingStatus,
        });
      });
    default:
      return state;
  }
};

export default getACenterReducer;
