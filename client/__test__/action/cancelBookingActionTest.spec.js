import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { CHANGE_BOOKING_STATUS, ERROR_MESSAGE } from '../../src/common/types';
import mockData from '../../__mockData__/mockData';
import cancelBookingAction from '../../src/action/cancelBookingAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Cancelling Booking Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should cancel a booking', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'sucessfully cancelled',
        },
      });
    });

    const expectedResponse = {
      type: CHANGE_BOOKING_STATUS,
      payload: {
        bookingStatus: mockData.bookingStatusData.bookingStatus,
        eventId: 1,
        index: 6,
      },

    };

    const store = mockStore({});
    store.dispatch(cancelBookingAction(mockData.bookingStatusData, 1, 6))
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResponse);
        done();
      });
  });

  it('should cancel a booking', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'sucessfully cancelled',
        },
      });
    });

    const expectedResponse = {
      type: CHANGE_BOOKING_STATUS,
      payload: {
        bookingStatus: mockData.bookingStatusData.bookingStatus,
        eventId: 1,
        index: 6,
      },

    };

    const store = mockStore({});
    store.dispatch(cancelBookingAction(mockData.bookingStatusData, 1, 6))
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResponse);
        done();
      });
  });
  it('should dispatch an error when an error response is received', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'sucessfully cancelled',
        },
      });
    });

    const expectedResponse = {
      type: CHANGE_BOOKING_STATUS,
      payload: {
        bookingStatus: mockData.bookingStatusData.bookingStatus,
        eventId: 1,
        index: 6,
      },

    };

    const store = mockStore({});
    store.dispatch(cancelBookingAction(mockData.bookingStatusData, 1, 6))
      .then(() => {
        expect(store.getActions()[1]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

