import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { ADD_NEW_USER, ERROR_MESSAGE } from '../../src/common/types';
import mockData from '../../__mockData__/mockData';
import signUpAction from '../../src/action/signUpAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('SignUp Action', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  it('should return signup details', (done) => {
    const { firstName, lastName, email } = mockData.signUpResponse;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          firstName, lastName, email,

        },
      });
    });

    const expectedResult = {
      type: ADD_NEW_USER,
      payload: mockData.signUpResponse,

    };

    const store = mockStore({});
    store.dispatch(signUpAction(mockData.signUpDetails))
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResult);
        done();
      });
  });
  it('should dispatch an error message when an error occur', (done) => {
    const { firstName, lastName, email } = mockData.signUpResponse;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          firstName, lastName, email,

        },
      });
    });

    const expectedResult = {
      type: ADD_NEW_USER,
      payload: mockData.signUpResponse,

    };

    const store = mockStore({});
    store.dispatch(signUpAction(mockData.signUpDetails))
      .then(() => {
        expect(store.getActions()[1]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

