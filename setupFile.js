import $ from 'jquery';
import Popper from './client/public/js/popper';

global.Popper = Popper;

global.$ = $;
global.jQuery = $;

const historymock = {
  push: jest.fn(),
};
global.history = historymock;


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

