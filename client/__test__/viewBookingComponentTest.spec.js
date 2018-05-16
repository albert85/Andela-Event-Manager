import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
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

  const newCenter = {
    name: 'Andela',
    id: 1,
    location: 'Ikeja',
    amount: 200000,
    capacity: 200,
  };

  const newEvent = {
    name: 'Wedding',
    id: 1,
    eventDate: '2018-05-23',
    bookingStatus: 0,
    centerId: 1,
  };

  it('Should test if wrapper instance is the same instance of BookingDetails', () => {
    wrapper = shallow(<BookingDetails { ...props } />);
    expect(wrapper.instance()).to.be.instanceof(BookingDetails);
  });

  it('Should return true when spy on on handlelocation on View Booking component', () => {
    const spy = sinon.spy(BookingDetails.prototype, 'handleLocation');
    wrapper = shallow(<BookingDetails {...props} />);
    wrapper.setProps( {
      centerState: [newCenter],
    });
    wrapper.find('#centerName').simulate('change',{ target: {value: 'Andela'}});
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });

  it('Should return true when it spy on on handlelocation on View Booking component', () => {
    const spy = sinon.spy(BookingDetails.prototype, 'handleLocation');
    wrapper = shallow(<BookingDetails {...props} />);
    wrapper.setProps( {
      centerState: [newCenter],
    });
    wrapper.find('#centerName').simulate('change',{ target: {value: 'Please select center'}});
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });

});
