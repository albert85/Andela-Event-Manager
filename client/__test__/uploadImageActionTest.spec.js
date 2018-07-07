import React from 'react';
import expect from 'expect';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { ERROR_MESSAGE, CHECK_PAGE_LOADING_STATUS } from '../src/common/types';
import mockData from '../__mockData__/mockData';
import UploadCenterImage from '../src/action/uploadCenterImage';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('UploadCenterImage Action', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  it('should dispatch error message when wrong response is received', (done) => {
    const serverResponse = mockData.uploadDetails;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          secure_url: mockData.uploadDetails,


        },
      });
    });

    const expectedResult = {
      type: ERROR_MESSAGE,
    };

    const store = mockStore({});
    store.dispatch(UploadCenterImage())
      .then(() => {
        expect(store.getActions()[1]).toEqual(expectedResult);
        done();
      });
  });
});

