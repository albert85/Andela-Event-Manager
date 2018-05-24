import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { GET_USER_ALL_EVENTS } from '../src/common/types';
import mockData from '../__mockData__/mockData';
import getAllUserEventAction from '../src/action/getUsersAllEventAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Get All Events Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should get all user events', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully login',
          token: 'e1e2e3rfefgsghrhdfsgdgddgdg',
          eventDetails: mockData.geteventResponse,
        },
      });
    });

    const expectedResponse = {
      type: GET_USER_ALL_EVENTS,
      payload: mockData.geteventResponse,
    };

    const store = mockStore({});
    store.dispatch(getAllUserEventAction(1))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedResponse);
        done();
      });
  });
});

