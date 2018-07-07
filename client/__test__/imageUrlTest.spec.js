import React from 'react';

import ImageUrlReducer from '../src/reducer/imageUrlReducer';
import * as types from '../src/common/types';

describe('<ImageUrlReducer />', () => {
  const defaultState = {
    imageUrl: '',
  };

  it('Should return initial state', () => {
    expect(ImageUrlReducer(defaultState, {})).toEqual(defaultState);
  });
  it('Should return image url when available', () => {
    expect(ImageUrlReducer(defaultState, { type: types.UPLOAD_IMAGE })).toEqual({});
  });
});
