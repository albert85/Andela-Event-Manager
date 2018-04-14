import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventHomePageHeader from '../src/component/EventHomePageHeader';


configure({ adapter: new Adapter() });

describe('<EventHomePageHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventHomePageHeader/>);
  });

  it('Should return number of div field on Event Home Page Header component', () => {
    expect(wrapper.find('div')).to.have.length(5);
  });

  it('Should return number of ul field on Footer component', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('Should return number of li field on Footer component', () => {
    expect(wrapper.find('li')).to.have.length(1);
  });

});
