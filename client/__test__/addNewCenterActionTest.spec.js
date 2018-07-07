import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { ADD_A_CENTER, ERROR_MESSAGE } from '../src/common/types';
import mockData from '../__mockData__/mockData';
import addNewCenterAction from '../src/action/addNewCenterAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Add Center Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should return signup details', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'hello',

        },
      });
    });

    const expectedResult = {
      type: ADD_A_CENTER,
      payload: mockData.addNewCenterDetails,

    };

    const store = mockStore({});
    await store.dispatch(addNewCenterAction(mockData.addNewCenterDetails))
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResult);
        done();
      });
  });
  it('should dispatch error message when there is an error response', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'hello',

        },
      });
    });

    const expectedResult = {
      type: ADD_A_CENTER,
      payload: mockData.addNewCenterDetails,

    };

    const store = mockStore({});
    await store.dispatch(addNewCenterAction(mockData.addNewCenterDetails))
      .then(() => {
        expect(store.getActions()[1]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

