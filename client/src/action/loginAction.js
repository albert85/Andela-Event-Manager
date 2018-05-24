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
    // console.log(process.env.ROOT_URL);
    // localStorage.setItem('message', res.data.message);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userIdNo', res.data.userIdNo);

    dispatch(loginUserAsync(res.data.message));

    if (res.data.message === 'successfully login') {
      if (userData.password === 'admin') {
        history.push('/centers');
      } else {
        history.push('/event-home-page');
      }
    }
  })
  .catch(() => {
    // localStorage.setItem('message', error.response.data.message)
    toastr.error('Wrong password and email');
  });
export default loginUser;
