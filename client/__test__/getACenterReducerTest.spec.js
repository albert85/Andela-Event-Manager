import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';

import GetACenterReducer from '../src/reducer/getACenterReducer';
import * as types from '../src/common/types';

describe('<GetACenterReducer />', () => {
  const eventDetails = [{
    id: 1,
    event: 'Wedding',
    location: 'Ikeja',
    bookingStatus: 1,
    eventDate: '2007/12/12',
  }];

  const centerDetails = {
    name: 'Adenike',
    location: 'Ikeja',
    amount: 10000,
    capacity: 2000,
  };

  it('Should return initial state', () => {
    expect(GetACenterReducer([], {})).to.be.eqls([]);
  });

  it('Should return state of a cancelled bookings', () => {
    // console.log(Object.assign({}, eventDetails[0], { bookingStatus: 0, index: 1 }));
    expect(GetACenterReducer(eventDetails, {
      type: types.CHANGE_BOOKING_STATUS,
      payload: Object.assign({}, eventDetails[0], { bookingStatus: 0, index: 1 }),
    })).to.be.eqls([{
      id: 1,
      event: 'Wedding',
      location: 'Ikeja',
      bookingStatus: 0,
      eventDate: '2007/12/12',
    }]);
  });


  it('Should return previous state if booking is not cancelled', () => {
    expect(GetACenterReducer(eventDetails, {
      type: types.CHANGE_BOOKING_STATUS,
      payload: Object.assign({}, eventDetails[0], { bookingStatus: 0, index: 0 }),
    })).to.be.eqls([{
      id: 1,
      event: 'Wedding',
      location: 'Ikeja',
      bookingStatus: 1,
      eventDate: '2007/12/12',
    }]);
  });

  //   Testing for viewing a center
  it('Should return state of a center details', () => {
    expect(GetACenterReducer(centerDetails, {
      type: types.VIEW_A_CENTER,
      payload: centerDetails,
    })).to.be.eqls(centerDetails);
  });
});
