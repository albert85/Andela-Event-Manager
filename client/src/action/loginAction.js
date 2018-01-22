import axios from 'axios';

import { LOGIN_USER } from '../common/types';

// const CLIENT_ROOT_URL = process.env.ROOT_URL || 'http://localhost:8000';
const CLIENT_ROOT_URL = 'https://andela-event-manager-app.herokuapp.com';

const loginUserAsync = userData => ({
  type: LOGIN_USER,
  payload: userData,
});

const loginUser = userData => (dispatch) => {
  axios
    .post('/api/v1/user/login', userData)
    .then((res) => {
      console.log(process.env.ROOT_URL);
      // localStorage.setItem('message', res.data.message);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userIdNo', res.data.userIdNo);

      dispatch(loginUserAsync(res.data.message));
      if (res.data.message === 'successfully login') {
        if (userData.password === 'admin') {
          return window.location.href = `${CLIENT_ROOT_URL}/centers`;
        }
        window.location.href = `${CLIENT_ROOT_URL}/event-home-page`;
      }

      window.document.getElementById('loginErroMessage').innerHTML = 'Wrong password and email';
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default loginUser;
