import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { LOGIN_USER, ERROR_MESSAGE } from '../../src/common/types';
import mockData from '../../__mockData__/mockData';
import login from '../../src/action/loginAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Login Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should login with admin login details', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          result: 'successfully login',
          token: 'e1e2e3rfefgsghrhdfsgdgddgdg',
          role: 'Admin',
        },
      });
    });

    const expectedResponse = {
      type: LOGIN_USER,
      payload: mockData.loginResponse,
    };

    const store = mockStore({});
    store.dispatch(login(mockData.loginDetail))
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResponse);
        done();
      });
  });

  it('should login with user login details', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          result: 'successfully login',
          token: 'e1e2e3rfefgsghrhdfsgdgddgdg',
        },
      });
    });

    const expectedResponse = {
      type: LOGIN_USER,
      payload: mockData.loginResponse,
    };

    const store = mockStore({});
    store.dispatch(login(mockData.loginDetail))
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
          result: 'successfully login',
          token: 'e1e2e3rfefgsghrhdfsgdgddgdg',
          role: 'Admin',
        },
      });
    });

    const expectedResponse = {
      type: LOGIN_USER,
      payload: mockData.loginResponse,
    };

    const store = mockStore({});
    store.dispatch(login(mockData.loginDetail))
      .then(() => {
        expect(store.getActions()[1]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

