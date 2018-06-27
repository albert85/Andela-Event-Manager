import axios from 'axios';
import toastr from 'toastr';

import { LOGIN_USER } from '../common/types';

// const CLIENT_ROOT_URL = process.env.ROOT_URL || 'http://localhost:8000';
// const CLIENT_ROOT_URL = 'https://andela-event-manager-app.herokuapp.com';

const loginUserAsync = userData => ({
  type: LOGIN_USER,
  payload: userData,
});

const loginUser = (userData, history) => dispatch => axios
  .post('/api/v1/user/login', userData)
  .then((res) => {
    console.log(res.data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userIdNo', res.data.userIdNo);
    localStorage.setItem('role', res.data.role);

    dispatch(loginUserAsync(res.data.result));

    if (res.data.result === 'successfully login') {
      if (res.data.role === 'Admin') {
        history.push('/centers');
      } else {
        history.push('/event-home-page');
      }
    }
  })
  .catch((error) => {
    // localStorage.setItem('message', error.response.data.message)
    console.log(error);
    toastr.error('Wrong password and email');
  });
export default loginUser;
