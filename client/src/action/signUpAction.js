import axios from 'axios';
import toastr from 'toastr';

import { ADD_NEW_USER } from '../common/types';

// const CLIENT_ROOT_URL = process.env.ROOT_URL || 'http://localhost:8000';
// const CLIENT_ROOT_URL = 'https://andela-event-manager-app.herokuapp.com';

export const addNewUserAsync = userData => ({
  type: ADD_NEW_USER,
  payload: userData,
});

const addNewUser = (userData, history) => dispatch => axios
  .post('/api/v1/users/signUp', userData)
  .then((res) => {
    localStorage.setItem('message', res.data.message);
    const {
      firstName, lastName, email, message,
    } = res.data;

    toastr.success('Account successfully created');

    dispatch(addNewUserAsync({
      firstName, lastName, email, message,
    }));
    history.push('/');
  })
  .catch(() => {
    toastr.warning('Email Already Registered to an Account');
  });
  
export default addNewUser;
