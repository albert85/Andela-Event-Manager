import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { EditCenter } from '../src/component/EditCenter'


configure({ adapter: new Adapter() });

describe('<EditCenter />', () => {
    let wrapper;

    const newEvent = {
        name: 'Wedding',
        id: 1,
        eventDate: '2018-05-23',
        bookingStatus: 0,
    };

    const newCenter = {
        name: 'Anike Event Centre',
        id: 1,
        location: 'Ikeja',
        amount: 200000,
        capacity: 200,
    };

    const props = {
        eventState: [],
        centerState: [],
        getAllCenters: () => { },
        getUsersAllEventAction: () => { },
        editAnEventAction: () => { },
        history: { push: () => { } },

    };

    beforeEach(() => {
        wrapper = shallow(<EditCenter {...props} />);
    });

    it('Should return number of div field on Edit Center component', () => {
        expect(wrapper.find('div')).to.have.length(14);
    });

    it('Should return number of table field on Edit Center component', () => {
        expect(wrapper.find('table')).to.have.length(1);
    });

    it('Should return number of thead field on Edit Center component', () => {
        expect(wrapper.find('thead')).to.have.length(1);
    });

    it('Should return number of tr field on Edit Center component', () => {
        expect(wrapper.find('tr')).to.have.length(1);
    });

    it('Should return number of th field on Edit Center component', () => {
        expect(wrapper.find('th')).to.have.length(6);
    });

    it('Should return number of tbody field on Edit Center component', () => {
        expect(wrapper.find('tbody')).to.have.length(1);
    });

    it('Should return number of td field on Edit Center component', () => {
        expect(wrapper.find('td')).to.have.length(0);
    });

    it('Should return number of button field on Edit Center component', () => {
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('Should return number of h4 field on Edit Center component', () => {
        expect(wrapper.find('h4')).to.have.length(3);
    });

    it('Should return number of form field on Edit Center component', () => {
        expect(wrapper.find('form')).to.have.length(1);
    });

    it('Should return number of label field on Edit Center component', () => {
        expect(wrapper.find('label')).to.have.length(4);
    });

    it('Should return number of input field on Edit Center component', () => {
        expect(wrapper.find('input')).to.have.length(4);
    });

    it('Should return number of i field on Edit Center component', () => {
        expect(wrapper.find('i')).to.have.length(2);
    });

    it('Should return number of td field on Edit Center component', () => {
        wrapper.setProps({
            centerState: [newCenter]
        })
        expect(wrapper.find('td')).to.have.length(6);
    });

    it('Should return number of i field on Edit Center component', () => {

        expect(wrapper.find('i')).to.have.length(2);
    });


});
