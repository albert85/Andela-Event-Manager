import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { LOGIN_USER } from '../src/common/types';
import mockData from '../__mockData__/mockData';
import login from '../src/action/loginAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Login Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should login with login details', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully login',
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
        expect(store.getActions()[0]).toEqual(expectedResponse);
        done();
      });
  });
});

