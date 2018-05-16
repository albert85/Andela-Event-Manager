// import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';

import loginReducer from '../src/reducer/loginReducer';
import * as types from '../src/common/types';

describe('<loginReducer />', () => {
  const loginDetails = {
    password: 'admin',
    email: 'you@yahoo.com',
  };

  it('Should return initial state', () => {
    expect(loginReducer([], {})).to.be.eqls([]);
  });

  it('Should return state of login user', () => {
    expect(loginReducer(loginDetails, {
      type: types.LOGIN_USER,
      payload: loginDetails,
    })).to.be.eqls(loginDetails);
  });
});
