import React from 'react';
// import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BookingDetails } from '../src/component/ViewBookings';


configure({ adapter: new Adapter() });

describe('<BookingDetails />', () => {
  let wrapper;

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

  const props = {
    centerState: [],
    getACenterState: [],
    getAllCenterAction: () => {},
    getACenterAction: () => {},
    SearchedCenter: jest.fn(() => Promise.resolve({})),
    messageStatus: {
      checkStatus: {
        isLoading: false,
        success: false,
        error: false,
      },
    },
    centerPageNo: {
      totalNumOfPages: 1,
    },

  };

  it('Should return true when spy on on handlelocation on View Booking component', () => {
    const spy = sinon.spy(BookingDetails.prototype, 'handleLocation');
    wrapper = shallow(<BookingDetails {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });
    wrapper.find('.center-btn-search').simulate('click');
    // console.log(wrapper.state());
    expect(spy.called).toBe(true);
    spy.restore();
  });

  it('Should update the state if centre is not found', () => {
    const spy = sinon.spy(BookingDetails.prototype, 'handleLocation');
    wrapper = shallow(<BookingDetails {...props} />);
    wrapper.setProps({
      centerState: [],
    });
    wrapper.find('#centerName').simulate('change', { target: { value: 'Andela' } });
    wrapper.find('#eventCenterLocation').simulate('change', { target: { value: 'Ikeja' } });
    wrapper.find('.center-btn-search').simulate('click');
    expect(spy.called).toBe(true);
    expect(wrapper.state('checkRecordIfExist')).toBe(false);
    spy.restore();
  });

  it('Should update the state if centre is found', () => {
    const spy = sinon.spy(BookingDetails.prototype, 'handleLocation');
    wrapper = shallow(<BookingDetails {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });
    wrapper.find('#centerName').simulate('change', { target: { value: 'Andela' } });
    wrapper.find('#eventCenterLocation').simulate('change', { target: { value: 'Ikeja' } });
    wrapper.find('.center-btn-search').simulate('click');
    expect(spy.called).toBe(true);
    expect(wrapper.state('checkRecordIfExist')).toBe(false);
    spy.restore();
  });

  it('Should updates center location in the state', () => {
    wrapper.instance().handleCenterLocation({ target: { value: 'Ikeja' } });
    expect(wrapper.state('centreLocation')).toEqual('Ikeja');
  });

  it('Should updates centreName in the state', () => {
    wrapper.instance().handleCenterName({ target: { value: 'Andela' } });
    expect(wrapper.state('centreName')).toEqual('Andela');
  });

  it('Should check if handlePagination was called', () => {
    wrapper.instance().handlePagination(10);
    expect(wrapper.state('currentPage')).toEqual(10);
  });
});
