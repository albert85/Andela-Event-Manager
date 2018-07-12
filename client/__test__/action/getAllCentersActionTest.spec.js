import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { GET_ALL_CENTERS, ERROR_MESSAGE } from '../../src/common/types';
import mockData from '../../__mockData__/mockData';
import getAllCentersAction from '../../src/action/getAllCentersAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Get All Centers Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should get all center details', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully retrieved',
          token: 'e1e2e3rfefgsghrhdfsgdgddgdg',
          centerDetails: [mockData.getCentersDetails],
        },
      });
    });

    const expectedResponse = {
      type: GET_ALL_CENTERS,
      payload: [mockData.getCentersDetails],
    };

    const store = mockStore({});
    store.dispatch(getAllCentersAction(mockData.getCentersDetails))
      .then(() => {
        expect(store.getActions()[3]).toEqual(expectedResponse);
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
          centerDetails: [mockData.getCentersDetails],
        },
      });
    });

    const expectedResponse = {
      type: GET_ALL_CENTERS,
      payload: [mockData.getCentersDetails],
    };

    const store = mockStore({});
    store.dispatch(getAllCentersAction(mockData.getCentersDetails))
      .then(() => {
        expect(store.getActions()[1]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

