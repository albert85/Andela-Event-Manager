import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { EDIT_AN_EVENT, ERROR_MESSAGE } from '../../src/common/types';
import mockData from '../../__mockData__/mockData';
import editAnEventAction from '../../src/action/editAnEventAction';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Get An Event Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should edit an event details', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          result: 'sucessfully updated',
        },
      });
    });

    const expectedResponse = {
      type: EDIT_AN_EVENT,
      payload: {
        modifiedData: mockData.getEditEventDetails,
        eventId: 1,
      },

    };

    const store = mockStore({});
    store.dispatch(editAnEventAction({ ...mockData.getEditEventDetails }, 1))
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
          message: 'sucessfully updated',
        },
      });
    });

    const expectedResponse = {
      type: EDIT_AN_EVENT,
      payload: {
        modifiedData: mockData.getEditEventDetails,
        eventId: 1,
      },

    };

    const store = mockStore({});
    store.dispatch(editAnEventAction({ ...mockData.getEditEventDetails }, 1))
      .then(() => {
        expect(store.getActions()[1]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

