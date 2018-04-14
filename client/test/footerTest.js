import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from '../src/component/Footer'


configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('Should return number of div field on Footer component', () => {
    expect(wrapper.find('div')).to.have.length(2);
  });

  it('Should return number of h4 field on Footer component', () => {
    expect(wrapper.find('h4')).to.have.length(1);
  });

});
