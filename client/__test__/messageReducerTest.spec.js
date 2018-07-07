import React from 'react';
// import { expect } from 'chai';

import messageUpReducer from '../src/reducer/messageReducer';
import * as types from '../src/common/types';

describe('<messageUpReducer />', () => {
  const defaultState = {
    checkStatus: {
      isLoading: false,
      success: false,
      error: false,
    },
  };

  it('Should return initial state', () => {
    expect(messageUpReducer(defaultState, {})).toEqual(defaultState);
  });

  it('Should return state of success', () => {
    const action = {
      type: types.SUCCESS_MESSAGE,
    };
    expect(messageUpReducer(defaultState, action)).toEqual({
      checkStatus: {
        isLoading: false,
        success: true,
        error: false,
      },
    });
  });
  it('Should return state of check_page_loading_status', () => {
    const action = {
      type: types.CHECK_PAGE_LOADING_STATUS,
    };
    expect(messageUpReducer(defaultState, action)).toEqual({
      checkStatus: {
        isLoading: true,
        success: false,
        error: false,
      },
    });
  });
  it('Should return state of error_message', () => {
    const action = {
      type: types.ERROR_MESSAGE,
    };
    expect(messageUpReducer(defaultState, action)).toEqual({
      checkStatus: {
        isLoading: false,
        success: false,
        error: true,
      },
    });
  });
});
