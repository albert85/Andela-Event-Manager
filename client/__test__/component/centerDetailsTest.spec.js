import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CenterDetails } from '../../src/component/CenterDetails';


configure({ adapter: new Adapter() });

describe('<CenterDetails />', () => {
  let wrapper;

  const newCenter = {
    name: 'Anike Event Centre',
    id: 1,
    location: 'Ikeja',
    amount: 200000,
    capacity: 200,

  };

  const newEvent = {
    name: 'Wedding',
    id: 1,
    eventDate: '2018-05-23',
    bookingStatus: 1,
    userId: 1,
  };

  const user = {
    email: 'you@example.com',
    firstname: 'First Name',
    id: 1,

  };

  const props = {
    eventState: [],
    getACenterState: [],
    centerState: [],
    userEmailState: [],
    getAllCenterAction: () => { },
    getACenterAction: () => { },
    cancelBookingAction: () => { },
    getAllEventsAction: () => {},
    getUserEmailAction: jest.fn(() => Promise.resolve({})),
    sendMailNotificationAction: () => { },
    getAllCenters: () => { },
    getUsersAllEventAction: () => { },
    editAnEventAction: () => { },
    messageStatus: {
      checkStatus: {
        isLoading: false,
        success: true,
        error: false,
      },
    },

    eventPageNo: {
      checkIfRecordExist: true,
    },

  };


  it('Should return number of div field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('div')).to.have.length(14);
  });

  it('Should return number of h4 field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('h4')).to.have.length(2);
  });

  it('Should return number of form field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return number of label field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('label')).to.have.length(4);
  });

  it('Should return number of input field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('input')).to.have.length(4);
  });

  it('Should return number of a field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('a')).to.have.length(2);
  });

  it('Should return true when handleLocation spy on Homepage component', () => {
    const spy = sinon.spy(CenterDetails.prototype, 'handleLocation');
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      centerState: [newCenter],
      getACenterState: [newEvent],
      userEmailState: [user],
    });

    wrapper.find('#centerName').simulate('change', { target: { value: 'Anike Event Centre' } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should return true when handleLocation spy on Homepage component', () => {
    const spy = sinon.spy(CenterDetails.prototype, 'handleLocation');
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      centerState: [newCenter],
      getACenterState: [newEvent],
      userEmailState: [user],
    });

    wrapper.find('#centerName').simulate('change', { target: { value: 'Please select center' } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should check if handleCancelBooking is called on Homepage component', () => {
    const spy = sinon.spy(CenterDetails.prototype, 'handleCancelBooking');
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      centerState: [newCenter],
      getACenterState: [newEvent],
      userEmailState: [user],
      eventState: [newEvent],
    });
    wrapper.find('#cancelBookingBtn').simulate('click');
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should return event when wrong eventId is supplied to handleCancelBooking on Homepage component', () => {
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      centerState: [newCenter],
      getACenterState: [newEvent],
      userEmailState: [user],
      eventState: [newEvent],
    });
    wrapper.instance().handleCancelBooking(10);
    expect(wrapper.state('centreName')).to.be.eqls('');
  });

  it('Should check if handleSelectCenter is called on Homepage component', () => {
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      centerState: [newCenter],
      getACenterState: [newEvent],
      userEmailState: [user],
      eventState: [newEvent],
    });
    wrapper.instance().handleSelectCenter({ target: { id: 1 } });
    expect(wrapper.state('centreName')).to.be.eqls(newCenter.name);
  });

  it('Should check if handlePagination is called on Homepage component', () => {
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      centerState: [newCenter],
      getACenterState: [newEvent],
      userEmailState: [user],
      eventState: [newEvent],
    });
    wrapper.instance().handlePagination(5);
    expect(wrapper.state('currentPage')).to.be.eqls(5);
  });

  it('Should check if handleCenterPagination is called on Homepage component', () => {
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      centerState: [newCenter],
      getACenterState: [newEvent],
      userEmailState: [user],
      eventState: [newEvent],
    });
    wrapper.instance().handleCenterPagination(5);
    expect(wrapper.state('currentCenterPage')).to.be.eqls(5);
  });
});
