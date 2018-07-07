import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TableRow from '../src/utility/centerTableRow';


configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
  let wrapper;

  const props = {
    centers: {
      i: 0,
      name: '',
      location: '',
      amount: 0,
      capacity: 0,
      centerId: 1,
    },
    handleCenterDetails: () => {},
    handleEditCenterDetails: () => {},
  };

  beforeEach(() => {
    wrapper = shallow(<TableRow { ...props } />);
  });

  it('should render TableRow component', () => {
    expect(wrapper).toBeDefined();
  });
});
