import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CentreEventTable from '../src/component/CentreEventTable'
import CentreEventList from '../src/component/CentreEventList'


configure({ adapter: new Adapter() });

describe('<CentreEventTable />', () => {
  let wrapper;
  const props ={
      getCentreEvent: [],
  }

  beforeEach(() => {
    wrapper = shallow(<CentreEventTable {...props} />);
  });

  it('Should return number of table field on CentreEventTable component', () => {
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return number of table head field on CentreEventTable component', () => {
    expect(wrapper.find('thead')).to.have.length(1);
  });

  it('Should return number of table body field on CentreEventTable component', () => {
    expect(wrapper.find('tbody')).to.have.length(1);
  });

});
