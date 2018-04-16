import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';

import signUpReducer from '../src/reducer/signUpReducer';
import * as types from '../src/common/types';

describe('<signUpReducer />', () => {
  const signUpDetails = {
    firstName: 'Temitope',
    lastName: 'Ola',
    isAdmin: false,
    password: 'admin',
    email: 'you@yahoo.com',
  };

  it('Should return initial state', () => {
    expect(signUpReducer([], {})).to.be.eqls([]);
  });

  it('Should return state of array of signup users', () => {
    expect(signUpReducer(signUpDetails, {
      type: types.ADD_NEW_USER,
      payload: signUpDetails,
    })).to.be.eqls([signUpDetails]);
  });
});
