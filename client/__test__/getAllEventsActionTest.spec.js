import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { GET_ALL_EVENTS } from '../src/common/types';
import mockData from '../__mockData__/mockData';
import getAllEventsAction from '../src/action/getAllEventsAction';

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
          eventDetails: mockData.getEventResponse,
        },
      });
    });

    const expectedResponse = {
      type: GET_ALL_EVENTS,
      payload: mockData.getEventResponse,
    };

    const store = mockStore({});
    store.dispatch(getAllEventsAction())
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedResponse);
        done();
      });
  });
});

