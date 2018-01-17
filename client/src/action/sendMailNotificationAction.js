import axios from 'axios';

import { SEND_EMAILS } from '../common/types';

const sendEmailAsync = userEmailAddress => ({
  type: SEND_EMAILS,
  payload: userEmailAddress,
});

const sendEmail = userEmailAddress => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios
    .post('/api/v1/user/recipientEmail', userEmailAddress)
    .then((res) => {
      localStorage.setItem('message', res.data.message);
      dispatch(sendEmailAsync(userEmailAddress));
    })
    .catch(error => localStorage.setItem('message', error.response.data.message));
};

export default sendEmail;
