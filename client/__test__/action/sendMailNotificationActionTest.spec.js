import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { SEND_EMAILS, ERROR_MESSAGE } from '../../src/common/types';
import mockData from '../../__mockData__/mockData';
import sendMailNotificationAction from '../../src/action/sendMailNotificationAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Get User Email Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should get all user events', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully retrieved',
          token: 'e1e2e3rfefgsghrhdfsgdgddgdg',
          result: mockData.getUserEmail,
        },
      });
    });

    const expectedResponse = {
      type: SEND_EMAILS,
      payload: mockData.getUserEmail[0],
    };

    const store = mockStore({});
    store.dispatch(sendMailNotificationAction(mockData.getUserEmail[0]))
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResponse);
        done();
      });
  });
  it('should dispatch an error message when an error occur', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'successfully retrieved',
          token: 'e1e2e3rfefgsghrhdfsgdgddgdg',
          result: mockData.getUserEmail,
        },
      });
    });

    const expectedResponse = {
      type: SEND_EMAILS,
      payload: mockData.getUserEmail[0],
    };

    const store = mockStore({});
    store.dispatch(sendMailNotificationAction(mockData.getUserEmail[0]))
      .then(() => {
        expect(store.getActions()[1]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

