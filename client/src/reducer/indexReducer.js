import { combineReducers } from 'redux';

import addNewUser from '../reducer/signUpReducer';
import loginUsers from '../reducer/loginReducer';
import centerReducer from '../reducer/centerReducer';
import eventReducer from '../reducer/eventReducer';
import getACenterReducer from '../reducer/getACenterReducer';
import getUsersEmailReducer from '../reducer/getUsersEmailReducer';

const rootReducer = combineReducers({
  signUpUser: addNewUser,
  loginUser: loginUsers,
  centerState: centerReducer,
  eventState: eventReducer,
  getACenterState: getACenterReducer,
  userEmailState: getUsersEmailReducer,
});

export default rootReducer;
