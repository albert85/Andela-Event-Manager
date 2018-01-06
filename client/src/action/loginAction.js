import axios from 'axios';

import { LOGIN_USER } from '../common/types';

const loginUserAsync = userData => ({
  type: LOGIN_USER,
  payload: userData,
});

const loginUser = userData => (dispatch) => {
  axios
.post('/api/v1/user/login', userData)
    .then((res) => {
        // console.log(res.data.message);
      localStorage.setItem('message', res.data.message);
      localStorage.setItem('token', res.data.token);
    
      dispatch(loginUserAsync(userData));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};
export default loginUser;
