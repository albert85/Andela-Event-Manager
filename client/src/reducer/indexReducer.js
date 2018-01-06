import {combineReducers} from 'redux';
import addNewUser from '../reducer/signUpReducer';
import loginUsers from '../reducer/loginReducer';

const rootReducer = combineReducers({
    signUpUser: addNewUser,
    loginUser: loginUsers,
});

export default rootReducer;