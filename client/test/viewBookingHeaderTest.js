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
      console.log(wrapper);
    expect(wrapper.find('div')).to.have.length(4);
  });

});
