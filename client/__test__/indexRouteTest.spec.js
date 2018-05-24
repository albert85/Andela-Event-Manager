import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import AllRoutes from '../src/routes/routes';

let props;
let isComponentMounted;

configure({ adapter: new Adapter() });


const getComponentStatus = () => {
  if (!isComponentMounted) {
    isComponentMounted = shallow(<AllRoutes {...props} />);
  }
  return isComponentMounted;
};

describe('Index Routes', () => {
  it('should successfully rendered route index', () => {
    expect(getComponentStatus()).toMatchSnapshot();
  });
});
