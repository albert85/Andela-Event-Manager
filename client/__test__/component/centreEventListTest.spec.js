import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CentreEventList from '../../src/component/CentreEventList';


configure({ adapter: new Adapter() });

describe('<CentreEventList />', () => {
  let wrapper;

  const props = {
    getCentreEvent: [{ name: 'wedding', eventDate: '2017-12-03' }],
  };

  beforeEach(() => {
    wrapper = shallow(<CentreEventList { ...props } />);
  });

  it('Should return length of wrapper Centre\'s Event List component', () => {
    expect(wrapper).toHaveLength(1);
  });


  it('should render Centre event list component', () => {
    expect(wrapper).toBeDefined();
  });
});
