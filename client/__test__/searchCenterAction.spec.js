import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { SEARCH_CENTER, ERROR_MESSAGE } from '../src/common/types';
import mockData from '../__mockData__/mockData';
import SearchCenterAction from '../src/action/searchCenter';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('SearchCenterAction Action', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  it('should return center details', (done) => {
    const serverResponse = mockData.centerToSearch;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          center: serverResponse,

        },
      });
    });

    const expectedResult = {
      type: SEARCH_CENTER,
      payload: mockData.centerToSearch,

    };

    const store = mockStore({});
    store.dispatch(SearchCenterAction(mockData.centerToSearch))
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResult);
        done();
      });
  });

  it('should dispatch error message when wrong response is received', (done) => {
    const serverResponse = mockData.centerToSearch;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          center: mockData.centerToSearch,


        },
      });
    });

    const expectedResult = {
      type: ERROR_MESSAGE,
    };

    const store = mockStore({});
    store.dispatch(SearchCenterAction())
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResult);
        done();
      });
  });
});

