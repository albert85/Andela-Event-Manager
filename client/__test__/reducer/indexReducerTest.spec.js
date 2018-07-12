import React from 'react';
import expect from 'expect';
import { createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import combinedReducer from '../../src/reducer/indexReducer';

window.alert = jest.fn();
window.location = jest.fn();

configure({ adapter: new Adapter() });

const store = createStore(combinedReducer);

describe('Index Reducer', () => {
  it('should test the reducer index ', () => {
    expect(store.getState()).toEqual({
      signUpUser: [],
      loginUser: [],
      centerState: [],
      eventState: [],
      getACenterState: [],
      userEmailState: [],
      messageStatus:
       { checkStatus: { isLoading: false, success: false, error: false } },
      paginationNum: [],
      centerPageNum: [],
      imageUrl: { imageUrl: '' },
    });
  });
});

