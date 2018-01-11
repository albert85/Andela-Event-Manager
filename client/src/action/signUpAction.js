import axios from 'axios';

import { ADD_NEW_USER } from '../common/types';

const addNewUserAsync = userData => ({
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
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default addNewUser;
