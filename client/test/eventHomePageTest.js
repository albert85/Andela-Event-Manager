import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
// global.window = {};
import Adapter from 'enzyme-adapter-react-16';
// import localStorage from 'mock-local-storage';

import { EventHomePage } from '../src/component/eventHomePage';

// window.localStorage = global.localStorage;

configure({ adapter: new Adapter() });

describe('<EventHomePage />', () => {
  let wrapper;
  const props = {
    eventState: [],
    centerState: [],
    getAllCenters: () => {},
    getUsersAllEventAction: (event) => {},
    deleteAnEventAction: () => {},

  };

  const newEvent = {
    name: 'wedding',
    id: 1,
    centerId: 1,
    eventDate: new Date('2018-12-01'),
    bookingStatus: 1,
  };

  const newCenter = {
    name: 'Anike Event Centre',
    id: 1,
    location: 'Ikeja',
  };

  beforeEach(() => {
    wrapper = shallow(<EventHomePage {...props} />);
    // console.log(wrapper.instance());
  });


  it('Should return number of table field on event homepage page', () => {
    // console.log(wrapper.instance());
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return number of button on event homepage page', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });


  it('Should return number of anchor a on event homepage page', () => {
    expect(wrapper.find('a')).to.have.length(4);
  });

  // it('Should return number of anchor a on event homepage page', () => {
  //   expect(wrapper.find(EventHomePage)).to.be.equal('div');
  // });

  it('Should check if the wrapper contains instance of Event homepage', () => {
    expect(wrapper.instance()).to.be.instanceof(EventHomePage);
  });

  it('Should check if event name is supplied on the Event homepage', () => {
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventName: 'Wedding' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().addEventDetails.eventName).to.be.equal('Wedding');
  });

  it('Should check if event location is supplied on the Event homepage', () => {
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventLocation: 'Adenike Centre' }) });
    expect(wrapper.state().addEventDetails.eventLocation).to.be.equal('Adenike Centre');
  });

  it('Should check if event venue is supplied on the Event homepage', () => {
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventVenue: 'Adeniyi Jones' }) });
    expect(wrapper.state().addEventDetails.eventVenue).to.be.equal('Adeniyi Jones');
  });

  it('Should check if event date is supplied on the Event homepage', () => {
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventDate: '2018-02-18' }) });
    expect(wrapper.state().addEventDetails.eventDate).to.be.equal('2018-02-18');
  });

  it('Should handle and store event name', () => {
    expect(wrapper.instance().handleEventName({ target: { value: 'Birthday' } })).to.be.equal(true);
  });

  it('Should handle and store event date', () => {
    expect(wrapper.instance().handleEventDate({ target: { value: '2018-02-19' } })).to.be.equal(true);
  });

  it('Should handle delete event', () => {
    expect(wrapper.instance().handleDeleteEvent()).to.be.equal(true);
  });

  it('Should return number of option available for field option', () => {
    wrapper.setProps({
      centerState: [newCenter],
    });
    expect(wrapper.find('option')).to.have.length(2);
  });

  // it('Should handle location', () => {
  //   wrapper = mount(<EventHomePage {...props} />);
  //   wrapper.setProps({
  //     centerState: [newCenter],
  //   });
  //   // wrapper.find('select').node.value = newCenter.name;
  //   // console.log(wrapper.find('o'))
  //   // wrapper.find('select').instance().props.onChange(({ target: { value: 'Anike Event Centre' } }));
  //   // wrapper.find('select').simulate('change');
  //   // expect(wrapper.find('select').props().value).to.be.equal('Anike Event Centre');
  //   // expect(wrapper.find('option')).to.have.length(2);
  //   // console.log(wrapper.find('select[defaultValue]').props());
  //   // expect(wrapper.instance().handleLocation()).to.be.equal(false);
  // });

  it('Should return the number of table ', () => {
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return the number of select field ', () => {
    expect(wrapper.find('select')).to.have.length(1);
  });

  it('Should return the number of table row ', () => {
    expect(wrapper.find('tr')).to.have.length(1);
  });

  it('Should check if previous user events are updated on the table ', () => {
    wrapper.setProps({
      eventState: [newEvent],
    });

    wrapper.setProps({
      centerState: [newCenter],
    });
    expect(wrapper.find('tr')).to.have.length(2);
  });

  // it('Should return the number of offset-md-3 class ', () => {
  //   expect(wrapper.find('.offset-md-3')).to.have.length(1);
  // });

  // it('Should return the number of .loginErroMessage id ', () => {
  //   expect(wrapper.find('#loginErroMessage')).to.have.length(1);
  // });

  // it('Should return the number of form on signup page ', () => {
  //   expect(wrapper.find('form')).to.have.length(1);
  // });

  // it('Should return the number of form-group on signup page ', () => {
  //   expect(wrapper.find('.form-group')).to.have.length(2);
  // });

  // it('Should return the number of section-signUp class on signup page ', () => {
  //   expect(wrapper.find('.section-sign-in')).to.have.length(1);
  // });

  // it('Should return the number of cover-section-signup on signup page ', () => {
  //   expect(wrapper.find('.cover-section-signin')).to.have.length(1);
  // });
});
