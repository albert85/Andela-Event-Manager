import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import { BookingDetails  from '../src/component/viewBookings';
import ViewBookHeader from '../src/component/ViewBookingHeaderComponent';


configure({ adapter: new Adapter() });

describe('<ViewBookHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ViewBookHeader />);
  });

  it('Should return number of div field on View Header component', () => {
    expect(wrapper.find('div')).to.have.length(4);
  });

  it('Should return number of h3 field on View Header component', () => {
    expect(wrapper.find('h3')).to.have.length(1);
  });

  it('Should return number of ul field on View Header component', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('Should return number of li field on View Header component', () => {
    expect(wrapper.find('li')).to.have.length(1);
  });

});
