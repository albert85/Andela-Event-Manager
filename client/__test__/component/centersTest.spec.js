import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Centers } from '../../src/component/Centers';


configure({ adapter: new Adapter() });

describe('<Center />', () => {
  let wrapper;
  const props = {
    eventState: [],
    centerState: [],
    getAllCenters: jest.fn(() => Promise.resolve({})),
    addNewCenterAction: jest.fn(() => Promise.resolve({})),
    messageStatus: {
      checkStatus: {
        isLoading: false,
        success: false,
        error: false,
      },
    },
    imageUrl: {
      imageUrl: '',
    },
    UploadCenterImage: () => {},

  };

  const newCenter = {
    name: 'Anike Event Centre',
    id: 1,
    location: 'Ikeja',
    amount: 200000,
    capacity: 200,
    centerUrl: 'https://my/image.jpg',
  };

  const newEvent = {
    name: 'Wedding',
    id: 1,
    eventDate: '2018-05-23',
    bookingStatus: 0,
  };

  beforeEach(() => {
    wrapper = shallow(<Centers { ...props } />);
  });

  it('Should return number of div field on Centers component', () => {
    expect(wrapper.find('div')).to.have.length(15);
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
    expect(wrapper.find('label')).to.have.length(5);
  });

  it('Should return number of input field on Centers component', () => {
    expect(wrapper.find('input')).to.have.length(5);
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
      centerState: [newCenter],
    });
    expect(wrapper.find('td')).to.have.length(5);
  });

  it('Should return number of td field on Centers component', () => {
    wrapper.setProps({
      centerState: [newCenter],
    });
    expect(wrapper.find('tr')).to.have.length(2);
  });

  it('Should return true when new center is added to the database on Centers component', () => {
    expect(wrapper.instance().addNewCenter({ preventDefault: () => {}, target: [{ value: 'Apollan Event Centre' }, { value: 'Ikeja' }, { value: 200 }, { value: 100000 }] })).to.be.equal(true);
  });

  it('Should check if constructor is an instance of Centers component', () => {
    expect(wrapper.instance().constructor(props)).to.be.instanceof(Centers);
  });

  it('Should updates clearImagePath in the state', () => {
    wrapper.instance().handleImageUpload({ target: { files: ['/user/path/to/file'], value: '/user/path/to/file' } });
    expect(wrapper.state('clearImagePath')).to.be.eqls('/user/path/to/file');
  });

  it('Should check if handlePagination was called', () => {
    wrapper.instance().handlePagination(10);
    expect(wrapper.state('currentPage')).to.be.eqls(10);
  });

  it('Should check if componentDidMount was called', () => {
    const spy = sinon.spy(Centers.prototype, 'componentDidMount');
    wrapper = shallow(<Centers { ...props } />);

    wrapper.instance().componentDidMount();

    wrapper.setProps({
      centerState: [newCenter],
      getAllCenters: [newCenter],
    });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should updates centreName in the state', () => {
    wrapper.instance().handleChangeName({ target: { value: 'Andela' } });
    expect(wrapper.state('centerName')).to.be.eqls('Andela');
  });

  it('Should updates center location in the state', () => {
    wrapper.instance().handleChangeLocation({ target: { value: 'Ikeja' } });
    expect(wrapper.state('centerLocation')).to.be.eqls('Ikeja');
  });

  it('Should updates center capacity in the state', () => {
    wrapper.instance().handleChangeCapacity({ target: { value: 100 } });
    expect(wrapper.state('centerCapacity')).to.be.eqls(100);
  });

  it('Should updates booking amount in the state', () => {
    wrapper.instance().handleChangeAmount({ target: { value: 10000 } });
    expect(wrapper.state('centerAmount')).to.be.eqls(10000);
  });

  it('Should check if addNewCenter is called in Centers component', () => {
    const spy = sinon.spy(Centers.prototype, 'addNewCenter');
    wrapper = shallow(<Centers { ...props } />);

    wrapper.setProps({
      imageUrl: {
        imageUrl: 'https//image/image.jpg',
      },
    });

    wrapper.instance().addNewCenter({
      preventDefault: () => {},
      target: [
        { value: newCenter.name },
        { value: newCenter.location },
        { value: newCenter.capacity },
        { value: newCenter.amount },
        { value: newCenter.centerUrl },
      ],
    });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });
});
