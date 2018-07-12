import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EditEventHeader from '../../src/component/EditEventHeader';


configure({ adapter: new Adapter() });

describe('<EditEventHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditEventHeader />);
  });

  it('Should return number of div field on Edit Event component', () => {
    expect(wrapper.find('div')).to.have.length(6);
  });

  it('Should return number of h3 field on Edit Event component', () => {
    expect(wrapper.find('h3')).to.have.length(1);
  });

  it('Should return number of ul field on Edit Event component', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });
});
