import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ModalComponent from '../../src/component/modalComponent/ModalComponent';


configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
  let wrapper;

  const props = {
    id: 0,
    currentPage: 1,
    numOfPages: 1,
    centerArray: [],
  };

  beforeEach(() => {
    wrapper = shallow(<ModalComponent { ...props } />);
  });


  it('should render Modal component component', () => {
    expect(wrapper).toBeDefined();
  });
});
