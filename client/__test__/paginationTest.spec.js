import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Pagination from '../src/component/Pagination';


configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
  let wrapper;

  const props = {
    numOfPages: 0,
    totalNumOfPages: 0,
  };

  beforeEach(() => {
    wrapper = shallow(<Pagination { ...props } />);
  });


  it('should render pagination component', () => {
    expect(wrapper).toBeDefined();
  });
});
