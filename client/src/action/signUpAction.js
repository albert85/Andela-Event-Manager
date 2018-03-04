import axios from 'axios';

import { ADD_NEW_USER } from '../common/types';

const CLIENT_ROOT_URL = process.env.ROOT_URL || 'http://localhost:8000';
// const CLIENT_ROOT_URL = 'https://andela-event-manager-app.herokuapp.com';

export const addNewUserAsync = userData => ({
  type: ADD_NEW_USER,
  payload: userData,
});

const addNewUser = userData => (dispatch) => {
  axios
    .post('/api/v1/users/signUp', userData)
    .then((res) => {
      localStorage.setItem('message', res.data.message);

      const newUserDetails = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
      };
     
      dispatch(addNewUserAsync(newUserDetails));
      alert('Thank you for registering, click Ok to login');
      window.location.href = `${CLIENT_ROOT_URL}`;
    })
    .catch(() => {
      // localStorage.setItem('message', error.response.data.message)
      window.document.getElementById('existingEmail').innerHTML = 'Email Already Registered to an Account';
    });
};
export default addNewUser;
