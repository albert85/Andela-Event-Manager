import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CenterDetails } from '../src/component/CenterDetails';


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
    getACenterState: [],
    centerState: [],
    userEmailState: [],
    getAllCenterAction: () => { },
    getACenterAction: () => { },
    cancelBookingAction: () => { },
    getUserEmailAction: () => { },
    sendMailNotificationAction: () => { },
    getAllCenters: () => { },
    getUsersAllEventAction: () => { },
    editAnEventAction: () => { },

  };


  it('Should return number of div field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('div')).to.have.length(14);
  });

  it('Should return number of h4 field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('h4')).to.have.length(3);
  });

  it('Should return number of form field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return number of label field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('label')).to.have.length(4);
  });

  it('Should return number of select field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('select')).to.have.length(1);
  });

  it('Should return number of option field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('option')).to.have.length(1);
  });

  it('Should return number of option field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });
    expect(wrapper.find('option')).to.have.length(2);
  });

  it('Should return number of input field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('input')).to.have.length(3);
  });

  it('Should return number of i field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('i')).to.have.length(1);
  });

  it('Should return number of a field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('a')).to.have.length(1);
  });

  it('Should return number of table field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return number of thead field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('thead')).to.have.length(1);
  });

  it('Should return number of tr field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('tr')).to.have.length(1);
  });

  it('Should return number of th field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('th')).to.have.length(5);
  });

  it('Should return number of tbody field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    expect(wrapper.find('tbody')).to.have.length(1);
  });

  it('Should return number of button field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    wrapper.setProps({
      getACenterState: [newEvent],
    });
    expect(wrapper.find('button')).to.have.length(2);
  });

  it('Should return number of td field on CenterDetails component', () => {
    wrapper = shallow(<CenterDetails {...props} />);
    wrapper.setProps({
      getACenterState: [newEvent],
    });
    expect(wrapper.find('td')).to.have.length(5);
  });


  it('Should return true when handleReBooking spy on Homepage component', () => {
    const spy = sinon.spy(CenterDetails.prototype, 'handleReBooking');
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      getACenterState: [newEvent],
    });

    wrapper.find('#rebookingButton').simulate('click', { preventDefault: () => {} });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should return true when handleCancelBooking spy on Homepage component', () => {
    const spy = sinon.spy(CenterDetails.prototype, 'handleCancelBooking');
    wrapper = shallow(<CenterDetails {...props} />);

    wrapper.setProps({
      getACenterState: [newEvent],
      userEmailState: [user],
    });

    wrapper.find('#cancelBookingBtn').simulate('click', { preventDefault: () => {} });
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
});
