import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { VIEW_A_CENTER } from '../src/common/types';
import mockData from '../__mockData__/mockData';
import getACenterAction from '../src/action/getACenterAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Get A Center Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should get a center details', (done) => {
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
      type: VIEW_A_CENTER,
      payload: mockData.getEventResponse,
    };

    const store = mockStore({});
    store.dispatch(getACenterAction(1))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedResponse);
        done();
      });
  });
});

