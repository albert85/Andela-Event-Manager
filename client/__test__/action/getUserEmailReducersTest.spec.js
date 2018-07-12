import React from 'react';
import { expect } from 'chai';

import GetUserEmail from '../../src/reducer/getUsersEmailReducer';
import * as types from '../../src/common/types';

describe('<GetUserEmail />', () => {
  const emailsDetails = [{
    email: 'you@yahoo.com',
  }];

  it('Should return initial state', () => {
    expect(GetUserEmail([], {})).to.be.eqls([]);
  });

  it('Should return state of all users email', () => {
    expect(GetUserEmail(emailsDetails, {
      type: types.GET_ALL_EMAILS,
      payload: emailsDetails,
    })).to.be.eqls(emailsDetails);
  });
});
