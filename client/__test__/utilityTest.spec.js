import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import centerTableRow from '../src/utility/centerTableRow';

let isComponentMounted;

configure({ adapter: new Adapter() });


describe('Index Routes', () => {
  const props = {
    centers: {
      name: '',
      location: '',
      amount: '',
      capacity: '',
    },
  };

  const getComponentStatus = () => {
    if (!isComponentMounted) {
      isComponentMounted = shallow(<centerTableRow {...props} />);
    }
    return isComponentMounted;
  };

  it('should successfully rendered', () => {
    expect(getComponentStatus()).toMatchSnapshot();
  });

  it('should successfully rendered', () => {
    console.log(getComponentStatus());
    expect(getComponentStatus()).toHaveLength(1);
  });
});
