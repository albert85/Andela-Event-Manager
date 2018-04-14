import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BookingDetails } from '../src/component/viewBookings';
// import ViewBookHeader from '../src/component/viewBookings';


configure({ adapter: new Adapter() });

describe('<BookingDetails />', () => {
  let wrapper;
  const props = {
    centerState: [],
    getACenterState: [],
    getAllCenterAction: () => {},
    getACenterAction: () => {},
    // signUpNewUser: () => {},

  };

  beforeEach(() => {
    wrapper = shallow(<BookingDetails { ...props } />);
  });

  it('Should return number of ViewBookingHeader field on View Booking page', () => {

    expect(wrapper.find('.container')).to.have.length(1);
  });
});
