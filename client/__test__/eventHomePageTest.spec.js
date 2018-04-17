// import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
// global.window = {};
import Adapter from 'enzyme-adapter-react-16';
// import localStorage from 'mock-local-storage';

import { EventHomePage } from '../src/component/EventHomePage';
import Footer from '../src/component/Footer';

// window.localStorage = global.localStorage;

configure({ adapter: new Adapter() });

describe('<EventHomePage />', () => {
  let wrapper;
  const props = {
    eventState: [],
    centerState: [],
    getAllCenters: () => { },
    getUsersAllEventAction: (event) => { },
    deleteAnEventAction: () => { },
    addNewEvent:() => {}

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


  it('Should return number of table field on event homepage page', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return number of button on event homepage page', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
  });


  it('Should return number of anchor a on event homepage page', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('a')).to.have.length(0);
  });

  it('Should return number of div on event homepage page', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('div')).to.have.length(15);
  });

  it('Should return number of form on event homepage page', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return number of span on event homepage page', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('span')).to.have.length(1);
  });

  it('Should return number of label on event homepage page', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('label')).to.have.length(4);
  });

  it('Should check if the wrapper contains instance of Event homepage', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.instance()).to.be.instanceof(EventHomePage);
  });

  it('Should check if event name is supplied on the Event homepage', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventName: 'Wedding' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().addEventDetails.eventName).to.be.equal('Wedding');
  });

  it('Should check if event location is supplied on the Event homepage', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventLocation: 'Adenike Centre' }) });
    expect(wrapper.state().addEventDetails.eventLocation).to.be.equal('Adenike Centre');
  });

  it('Should check if event venue is supplied on the Event homepage', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventVenue: 'Adeniyi Jones' }) });
    expect(wrapper.state().addEventDetails.eventVenue).to.be.equal('Adeniyi Jones');
  });

  it('Should check if event date is supplied on the Event homepage', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    const OldState = wrapper.state().addEventDetails;
    wrapper.setState({ addEventDetails: Object.assign(OldState, { eventDate: '2018-02-18' }) });
    expect(wrapper.state().addEventDetails.eventDate).to.be.equal('2018-02-18');
  });

  it('Should handle and store event name', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.instance().handleEventName({ target: { value: 'Birthday' } })).to.be.equal(true);
  });

  it('Should handle and store event date', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.instance().handleEventDate({ target: { value: '2018-02-19' } })).to.be.equal(true);
  });

  it('Should handle delete event', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.instance().handleDeleteEvent()).to.be.equal(true);
  });

  it('Should return number of option available for field option', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });
    expect(wrapper.find('option')).to.have.length(2);
  });


  it('Should return the number of table ', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return the number of select field ', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('select')).to.have.length(1);
  });

  it('Should return the number of table row ', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    expect(wrapper.find('tr')).to.have.length(1);
  });

  it('Should check if previous user events are updated on the table ', () => {
    wrapper = shallow(<EventHomePage {...props} />);
    wrapper.setProps({
      eventState: [newEvent],
    });

    wrapper.setProps({
      centerState: [newCenter],
    });
    expect(wrapper.find('tr')).to.have.length(2);
  });

  it('Should return true when select option was selected on Homepage component', () => {
    const spy = sinon.spy(EventHomePage.prototype, 'handleLocation');
    wrapper = shallow(<EventHomePage {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.find('#eventCentre').simulate('change',{target: {value: 'Anike Event Centre'}});
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });

  it('Should return true when select option was selected on Homepage component', () => {
    const spy = sinon.spy(EventHomePage.prototype, 'handleAddEvent');
    wrapper = shallow(<EventHomePage {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.setState({
      eventCentreName: 'Anike Event Centre',
      ddEventDetails: {
        eventName: 'Wedding',
        eventDate: '2018-04-10',
    },
    })

    wrapper.find('#addEventForm').simulate('submit',{preventDefault: ()=>{} });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });

});
