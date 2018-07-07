import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import AllRoutes, { AuthRoute } from '../src/routes/routes';

let props;
let isComponentMounted;
let isComponentSecondMounted;

configure({ adapter: new Adapter() });


const getComponentStatus = () => {
  if (!isComponentMounted) {
    isComponentMounted = shallow(<AllRoutes {...props} />);
  }
  return isComponentMounted;
};
const getComponentSecondStatus = () => {
  if (!isComponentSecondMounted) {
    isComponentSecondMounted = shallow(<AuthRoute {...props} />);
  }
  return isComponentSecondMounted;
};

describe('Index Routes', () => {
  it('should successfully rendered route index', () => {
    expect(getComponentStatus()).toMatchSnapshot();
  });
  it('should successfully rendered route index', () => {
    expect(getComponentSecondStatus()).toMatchSnapshot();
  });
});
