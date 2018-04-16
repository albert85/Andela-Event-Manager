import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Center} from '../src/component/Centers'


configure({ adapter: new Adapter() });

describe('<Center />', () => {
  let wrapper;
  const props = {
    eventState: [],
    centerState: [],
    getAllCenters: () => {},
    addNewCenterAction: () => {},

  };

  const newCenter = {
    name: 'Anike Event Centre',
    id: 1,
    location: 'Ikeja',
    amount: 200000,
    capacity: 200,
  };

  beforeEach(() => {
    wrapper = shallow(<Center { ...props } />);
  });

  it('Should return number of div field on Centers component', () => {
    expect(wrapper.find('div')).to.have.length(14);
  });

  it('Should return number of table field on Centers component', () => {
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return number of thead field on Centers component', () => {
    expect(wrapper.find('thead')).to.have.length(1);
  });

  it('Should return number of tr field on Centers component', () => {
    expect(wrapper.find('tr')).to.have.length(1);
  });

  it('Should return number of tbody field on Centers component', () => {
    expect(wrapper.find('tbody')).to.have.length(1);
  });

  it('Should return number of th field on Centers component', () => {
    expect(wrapper.find('th')).to.have.length(5);
  });
  it('Should return number of h3 field on Centers component', () => {
    expect(wrapper.find('h3')).to.have.length(1);
  });

  it('Should return number of form field on Centers component', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return number of label field on Centers component', () => {
    expect(wrapper.find('label')).to.have.length(4);
  });

  it('Should return number of input field on Centers component', () => {
    expect(wrapper.find('input')).to.have.length(4);
  });

  it('Should return number of span field on Centers component', () => {
    expect(wrapper.find('span')).to.have.length(1);
  });

  it('Should return number of button field on Centers component', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('Should return number of h4 field on Centers component', () => {
    expect(wrapper.find('h4')).to.have.length(2);
  });

  it('Should return number of i field on Centers component', () => {
    expect(wrapper.find('i')).to.have.length(1);
  });

  it('Should return number of td field on Centers component', () => {
    wrapper.setProps({
        centerState:[newCenter]
    });
    expect(wrapper.find('td')).to.have.length(5);
  });

  it('Should return number of td field on Centers component', () => {
    wrapper.setProps({
        centerState:[newCenter]
    });
    expect(wrapper.find('tr')).to.have.length(2);
  });

  it('Should return true when new center is added to the database on Centers component', () => {
    expect(wrapper.instance().addNewCenter({preventDefault: () => {} , target: [{value:'Apollan Event Centre'},{value: 'Ikeja'},{value: 200},{value:100000}]})).to.be.equal(true);
  });

  it('Should check if constructor is an instance of Centers component', () => {
    expect(wrapper.instance().constructor(props)).to.be.instanceof(Center);
  });

});
