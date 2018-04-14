import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditCenterHeader from '../src/component/EditCenterHeader';

configure({ adapter: new Adapter() });

describe('<EditCenterHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditCenterHeader />);
  });

  it('Should return number of div field on Edit Center Header component', () => {
    expect(wrapper.find('div')).to.have.length(4);
  });

  it('Should return number of h3 field on Edit Center Header component', () => {
    expect(wrapper.find('h3')).to.have.length(1);
  });

  it('Should return number of ul field on Edit Center Header component', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('Should return number of li field on Edit Center Header component', () => {
    expect(wrapper.find('li')).to.have.length(1);
  });

});
