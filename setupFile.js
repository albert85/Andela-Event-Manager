import $ from 'jquery';
import Popper from './client/public/js/popper';

global.Popper = Popper;

global.$ = $;
global.jQuery = $;


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

