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

  it('Should test if wrapper instance is the same instance of BookingDetails', () => {

    expect(wrapper.instance()).to.be.instanceof(BookingDetails);
  });
});
