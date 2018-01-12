import { combineReducers } from 'redux';

import addNewUser from '../reducer/signUpReducer';
import loginUsers from '../reducer/loginReducer';
import centerReducer from '../reducer/centerReducer';
import eventReducer from '../reducer/eventReducer';
import getACenterReducer from '../reducer/getACenterReducer';

const rootReducer = combineReducers({
  signUpUser: addNewUser,
  loginUser: loginUsers,
  centerState: centerReducer,
  eventState: eventReducer,
  getACenterState: getACenterReducer,
});

export default rootReducer;
