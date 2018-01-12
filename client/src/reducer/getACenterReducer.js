import { VIEW_A_CENTER } from '../common/types';

const getACenterReducer = (state = [], action) => {
  switch (action.type) {
    case VIEW_A_CENTER:
      return action.payload;
    default:
      return state;
  }
};

export default getACenterReducer;
