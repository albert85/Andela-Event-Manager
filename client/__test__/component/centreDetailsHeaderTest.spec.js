import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CentreDetailsHeader from '../../src/component/CentreDetailsHeader';


configure({ adapter: new Adapter() });

describe('<CentreDetailsHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CentreDetailsHeader />);
  });

  it('Should return number of div field on Edit Centre component header', () => {
    expect(wrapper.find('div')).to.have.length(7);
  });

  it('Should return number of h3 field on Edit Centre component header', () => {
    expect(wrapper.find('h3')).to.have.length(1);
  });

  it('Should return number of ul field on Edit Centre component header', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('Should return number of li field on Edit Centre component header', () => {
    expect(wrapper.find('li')).to.have.length(3);
  });
});
