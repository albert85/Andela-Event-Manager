// import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';

import EventReducer from '../src/reducer/eventReducer';
import * as types from '../src/common/types';

describe('<EventReducer />', () => {
  const eventDetails = [{
    id: 1,
    event: 'Wedding',
    location: 'Ikeja',
    bookingStatus: 1,
    eventDate: '2007/12/12',
  }];

  it('Should return initial state', () => {
    expect(EventReducer([], {})).to.be.eqls([]);
  });

  it('Should return add new event state', () => {
    expect(EventReducer([], {
      type: types.ADD_AN_EVENT,
      payload: eventDetails[0],
    })).to.be.eqls(eventDetails);
  });


  it('Should return editted event state', () => {
    expect(EventReducer(eventDetails, {
      type: types.EDIT_AN_EVENT,
      payload: Object.assign({}, eventDetails[0], { modifiedData: { event: 'Birthday' }, eventId: 1 }),
    })).to.be.eqls([{
      id: 1,
      event: 'Birthday',
      location: 'Ikeja',
      bookingStatus: 1,
      eventDate: '2007/12/12',
    }]);
  });


  it('Should return previous event state when no event is editted', () => {
    expect(EventReducer(eventDetails, {
      type: types.EDIT_AN_EVENT,
      payload: Object.assign({}, eventDetails[0], { modifiedData: { event: 'Birthday' }, eventId: 0 }),
    })).to.be.eqls([{
      id: 1,
      event: 'Wedding',
      location: 'Ikeja',
      bookingStatus: 1,
      eventDate: '2007/12/12',
    }]);
  });


  it('Should return all events state', () => {
    expect(EventReducer(eventDetails, {
      type: types.GET_ALL_EVENTS,
      payload: eventDetails[0],
    })).to.be.eqls(eventDetails[0]);
  });

  it('Should return all events state', () => {
    expect(EventReducer(eventDetails, {
      type: types.GET_USER_ALL_EVENTS,
      payload: eventDetails[0],
    })).to.be.eqls(eventDetails[0]);
  });

  it('Should delete an events in a state', () => {
    expect(EventReducer(eventDetails, {
      type: types.DELETE_AN_EVENT,
      payload: 1,
    })).to.be.eqls([]);
  });

});
