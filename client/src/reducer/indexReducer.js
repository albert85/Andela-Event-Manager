import { combineReducers } from 'redux';

import '../../public/css/bootstrap.min.css';
import '../../public/css/font-awesome.min.css';
import '../../public/css/style.css';


import '../../public/js/jquery-3.2.1.min';
import '../../public/js/popper';
import '../../public/js/bootstrap.min';

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
