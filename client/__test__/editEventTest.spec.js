import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { EditEvent } from '../src/component/EditEvent'


configure({ adapter: new Adapter() });

describe('<EditEvent />', () => {
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
    eventState: [],
    centerState: [],
    getAllCenters: () => { },
    getUsersAllEventAction: () => { },
    editAnEventAction: () => { },
    history: { push: () => { } },

  };


  // beforeEach(() => {
  //  // const spy = sinon.spy(EditEvent.prototype, 'onClick')
  //   wrapper = shallow(<EditEvent {...props} />);
  // });

  it('Should return number of div field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('div')).to.have.length(14);
  });

  it('Should return number of table field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return number of thead field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('thead')).to.have.length(1);
  });

  it('Should return number of tr field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('tr')).to.have.length(1);
  });

  it('Should return number of th field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('th')).to.have.length(7);
  });

  it('Should return number of tbody field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('tbody')).to.have.length(1);
  });

  it('Should return number of td field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('td')).to.have.length(0);
  });

  it('Should return number of td field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    wrapper.setProps({
      eventState: [newEvent],
      centerState: [newCenter],
    })
    expect(wrapper.find('td')).to.have.length(7);
  });

  it('Should return number of button field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('Should return number of i field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('i')).to.have.length(1);
  });

  it('Should return number of h4 field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('h4')).to.have.length(3);
  });

  it('Should return number of form field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return number of label field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('label')).to.have.length(4);
  });

  it('Should return number of input field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('input')).to.have.length(4);
  });

  it('Should return number of span field on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.find('span')).to.have.length(1);
  });

  it('Should return true when Event Date is Editted on Edit Event component', () => {
    wrapper = shallow(<EditEvent {...props} />);
    expect(wrapper.instance().handleEventDate({ target: { value: '2017-11-12' } })).to.be.equal(true);
  });

  it('Should return true when button was clicked on Edit Event component', () => {
    const spy = sinon.spy(EditEvent.prototype, 'handleStoringId');
    wrapper = shallow(<EditEvent {...props} />);
    wrapper.setProps({
      eventState: [newEvent],
      centerState: [newCenter],
    });
    wrapper.find('#editButton').simulate('click');
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });

  it('Should return true when button was clicked on Edit Event component', () => {
    const spy = sinon.spy(EditEvent.prototype, 'handleEditEvent');
    wrapper = shallow(<EditEvent {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.setState({
      editEventName: "Wedding",
            editLocation: "Ikeja",
            editEventDate: "2018-11-01",
            editEventCenter: "Andela",
            editEventLocation: "Ikeja"
    })
    wrapper.find('#addEventFormEdit').simulate('submit',{preventDefault:()=>{}});
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });

  it('Should return true when Center is Editted on Edit Event component', () => {
    expect(wrapper.instance().handleCenter({ target: { value: 'Apollan' } })).to.be.equal(true);
  });

  it('Should return true when Event Location is Editted on Edit Event component', () => {
    expect(wrapper.instance().handleEventLocation({ target: { value: 'Ikeja' } })).to.be.equal(true);
  });

  it('Should return true when Event Name is Editted on Edit Event component', () => {
    expect(wrapper.instance().handleEventName({ target: { value: 'Wedding' } })).to.be.equal(true);
  });

  it('Should check if wrapper.instance is an instance of Edit Event component', () => {
    expect(wrapper.instance()).to.be.instanceOf(EditEvent);
  });

  it('Should change editEventName State  on Edit Event component', () => {
    const OldState = wrapper.state().editEventName;
    wrapper.setState({ editEventName: 'Wedding' });
    expect(wrapper.state().editEventName).to.be.equal('Wedding');
  });

  it('Should change editLocation State  on Edit Event component', () => {
    const OldState = wrapper.state().editLocation;
    wrapper.setState({ editLocation: 'Ikeja' });
    expect(wrapper.state().editLocation).to.be.equal('Ikeja');
  });

  it('Should change editEventDate State  on Edit Event component', () => {
    const OldState = wrapper.state().editEventDate;
    wrapper.setState({ editEventDate: '2018-04-01' });
    expect(wrapper.state().editEventDate).to.be.equal('2018-04-01');
  });

  it('Should change editEventCenter State  on Edit Event component', () => {
    const OldState = wrapper.state().editEventCenter;
    wrapper.setState({ editEventCenter: 'Apollan Event Centre' });
    expect(wrapper.state().editEventCenter).to.be.equal('Apollan Event Centre');
  });


});