import { combineReducers } from 'redux';
import 'jquery';

import '../../public/css/font-awesome.min.css';
import '../../public/css/style.css';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';


import addNewUser from '../reducer/signUpReducer';
import loginUsers from '../reducer/loginReducer';
import centerReducer from '../reducer/centerReducer';
import eventReducer from '../reducer/eventReducer';
import getACenterReducer from '../reducer/getACenterReducer';
import getUsersEmailReducer from '../reducer/getUsersEmailReducer';
import messageReducer from '../reducer/messageReducer';
import paginationReducer from '../reducer/paginationReducer';
import centerPageNum from '../reducer/centerPaginationReducer';

const rootReducer = combineReducers({
  signUpUser: addNewUser,
  loginUser: loginUsers,
  centerState: centerReducer,
  eventState: eventReducer,
  getACenterState: getACenterReducer,
  userEmailState: getUsersEmailReducer,
  messageStatus: messageReducer,
  paginationNum: paginationReducer,
  centerPageNum,

});

export default rootReducer;
