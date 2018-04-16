import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CenterDetails } from '../src/component/CenterDetails';
import { AttachSession } from 'protractor/built/driverProviders';



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
        bookingStatus: 0,
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


    beforeEach(() => {
        wrapper = shallow(<CenterDetails {...props} />);
    });

    it('Should return number of div field on CenterDetails component', () => {
        expect(wrapper.find('div')).to.have.length(14);
    });

    it('Should return number of h4 field on CenterDetails component', () => {
        expect(wrapper.find('h4')).to.have.length(3);
    });

    it('Should return number of form field on CenterDetails component', () => {
        expect(wrapper.find('form')).to.have.length(1);
    });

    it('Should return number of label field on CenterDetails component', () => {
        expect(wrapper.find('label')).to.have.length(4);
    });

    it('Should return number of select field on CenterDetails component', () => {
        expect(wrapper.find('select')).to.have.length(1);
    });

    it('Should return number of option field on CenterDetails component', () => {
        expect(wrapper.find('option')).to.have.length(1);
    });

    it('Should return number of option field on CenterDetails component', () => {
        wrapper.setProps({
            centerState: [newCenter],
        })
        expect(wrapper.find('option')).to.have.length(2);
    });
    
    it('Should return number of input field on CenterDetails component', () => {
        expect(wrapper.find('input')).to.have.length(3);
    });

    it('Should return number of i field on CenterDetails component', () => {
        expect(wrapper.find('i')).to.have.length(1);
    });

    it('Should return number of a field on CenterDetails component', () => {
        expect(wrapper.find('a')).to.have.length(1);
    });

    it('Should return number of table field on CenterDetails component', () => {
        expect(wrapper.find('table')).to.have.length(1);
    });

    it('Should return number of thead field on CenterDetails component', () => {
        expect(wrapper.find('thead')).to.have.length(1);
    });

    it('Should return number of tr field on CenterDetails component', () => {
        expect(wrapper.find('tr')).to.have.length(1);
    });

    it('Should return number of th field on CenterDetails component', () => {
        expect(wrapper.find('th')).to.have.length(5);
    });

    it('Should return number of tbody field on CenterDetails component', () => {
        expect(wrapper.find('tbody')).to.have.length(1);
    });

    it('Should return number of button field on CenterDetails component', () => {
        wrapper.setProps({
            getACenterState: [newEvent]
        })
        expect(wrapper.find('button')).to.have.length(2);
    });

    it('Should return number of td field on CenterDetails component', () => {
        wrapper.setProps({
            getACenterState: [newEvent]
        })
        expect(wrapper.find('td')).to.have.length(5);
    });
/*
    it('Should check handleCancelBooking instance on CenterDetails component', () => {
        wrapper.setProps({
            getACenterState: [newCenter],
        })

        // console.log(wrapper.instance().handleRebooking(1));
        
        // expect(wrapper.find('tbody')).to.have.length(1);
    });


*/


});
