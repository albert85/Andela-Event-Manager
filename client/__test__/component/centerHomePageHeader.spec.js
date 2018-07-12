import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CenterHomePageHeader from '../../src/component/CenterHomePageHeader';


configure({ adapter: new Adapter() });

describe('<CenterHomePageHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CenterHomePageHeader />);
  });

  it('Should return number of div field on Center HomePage Header component', () => {
    expect(wrapper.find('div')).to.have.length(7);
  });

  it('Should return number of h3 field on Center HomePage Header component', () => {
    expect(wrapper.find('h3')).to.have.length(1);
  });

  it('Should return number of ul field on Center HomePage Header component', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('Should return number of li field on Center HomePage Header component', () => {
    expect(wrapper.find('li')).to.have.length(3);
  });

  it('Should return number of a field on Center HomePage Header component', () => {
    expect(wrapper.find('a')).to.have.length(10);
  });
});

