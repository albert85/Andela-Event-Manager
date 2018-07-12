import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DisplayCenters from '../../src/component/centerSelection/DisplayCenters';


configure({ adapter: new Adapter() });

describe('<DisplayCenters />', () => {
  let wrapper;

  const newCenter = {
    name: 'Anike Event Centre',
    id: 1,
    location: 'Ikeja',
    amount: 200000,
    capacity: 200,
    centerUrl: 'https://my/image.jpg',
  };

  const props = {
    centerArray: [],
    handleSelectCenter: () => {},
  };

  beforeEach(() => {
    wrapper = shallow(<DisplayCenters { ...props } />);
  });

  it('should render DisplayCenters component when no center is created', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render DisplayCenters component when centers are available', () => {
    wrapper.setProps({
      centerArray: [newCenter],
    });
    expect(wrapper).toBeDefined();
  });
});
