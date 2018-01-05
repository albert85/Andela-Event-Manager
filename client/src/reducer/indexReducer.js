import {combineReducers} from 'redux';
import addNewUser from '../reducer/signUpReducer';

const rootReducer = combineReducers({
    signUpUser: addNewUser,
});

export default rootReducer;