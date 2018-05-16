// import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';

import CenterReducer from '../src/reducer/centerReducer';
import * as types from '../src/common/types';

describe('<CenterReducer />', () => {
  const centerDetails = [{
    id: 1,
    event: 'Adenike',
    location: 'Ikeja',
    amount: 10000,
    capacity: 500,
  }];

  it('Should return initial state', () => {
    expect(CenterReducer([], {})).to.be.eqls([]);
  });

  it('Should return add new center state', () => {
    expect(CenterReducer([], {
      type: types.ADD_A_CENTER,
      payload: centerDetails[0],
    })).to.be.eqls(centerDetails);
  });


  it('Should return editted center state', () => {
    expect(CenterReducer(centerDetails, {
      type: types.EDIT_A_CENTER,
      payload: Object.assign({}, centerDetails[0], { modifiedData: { event: 'Bolatumi' }, centerId: 1 }),
    })).to.be.eqls([{
      id: 1,
      event: 'Bolatumi',
      location: 'Ikeja',
      amount: 10000,
      capacity: 500,
    }]);
  });


  it('Should return previous center state when no event is editted', () => {
    expect(CenterReducer(centerDetails, {
      type: types.EDIT_A_CENTER,
      payload: Object.assign({}, centerDetails[0], { modifiedData: { event: 'Bolatumi' }, centerId: 0 }),
    })).to.be.eqls([{
      id: 1,
      event: 'Adenike',
      location: 'Ikeja',
      amount: 10000,
      capacity: 500,
    }]);
  });


  it('Should return all center state', () => {
    expect(CenterReducer(centerDetails, {
      type: types.GET_ALL_CENTERS,
      payload: centerDetails[0],
    })).to.be.eqls(centerDetails[0]);
  });
});
