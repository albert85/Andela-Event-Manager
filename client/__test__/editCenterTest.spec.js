import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { EditCenter } from '../src/component/EditCenter';


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
    centerState: [],
    getAllCenters: jest.fn(() => Promise.resolve({})),
    editACenterAction: jest.fn(() => Promise.resolve({})),
    messageStatus: {
      checkStatus: {
        isLoading: false,
        success: false,
        error: false,
      },
    },
    imageUrl: {
      imageUrl: [],
    },
    centerPageNo: {
      totalNumOfPages: 1,
    },
    UploadCenterImage: () => {},
  };


  it('Should return number of div field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('div')).to.have.length(15);
  });

  it('Should return number of table field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('Should return number of thead field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('thead')).to.have.length(1);
  });

  it('Should return number of tr field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('tr')).to.have.length(1);
  });

  it('Should return number of th field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('th')).to.have.length(6);
  });

  it('Should return number of tbody field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('tbody')).to.have.length(1);
  });

  it('Should return number of td field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('td')).to.have.length(0);
  });

  it('Should return number of button field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('Should return number of h4 field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('h4')).to.have.length(3);
  });

  it('Should return number of form field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return number of label field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('label')).to.have.length(5);
  });

  it('Should return number of input field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('input')).to.have.length(5);
  });

  it('Should return number of i field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('i')).to.have.length(2);
  });

  it('Should return number of td field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });
    expect(wrapper.find('td')).to.have.length(6);
  });

  it('Should return number of i field on Edit Center component', () => {
    wrapper = shallow(<EditCenter {...props} />);
    expect(wrapper.find('i')).to.have.length(2);
  });

  it('Should spy on handleChangeCentrename method and return true on Edit Center component', () => {
    const spy = sinon.spy(EditCenter.prototype, 'handleChangeCentreName');
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.find('#eventnameEdit').simulate('change', { target: { value: 'Andela' } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });


  it('Should spy on handleChangeCentreLocation method and return true on Edit Center component', () => {
    const spy = sinon.spy(EditCenter.prototype, 'handleChangeCentreLocation');
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.find('#eventcenterlocationEdit').simulate('change', { target: { value: 'Anthony' } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should spy on handleChangeCentreAmount method and return true on Edit Center component', () => {
    const spy = sinon.spy(EditCenter.prototype, 'handleChangeCentreAmount');
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.find('#eventcenteramountEdit').simulate('change', { target: { value: 200 } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });


  it('Should spy on handleChangeCentreCapacity method and return true on Edit Center component', () => {
    const spy = sinon.spy(EditCenter.prototype, 'handleChangeCentreCapacity');
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.find('#eventcentercapacityEdit').simulate('change', { target: { value: 20000 } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });


  it('Should spy on handleEditCenterDetails method and return true on Edit Center component', () => {
    const spy = sinon.spy(EditCenter.prototype, 'handleEditCenterDetails');
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.setState({
      centreName: 'Andela',
      centreLocation: '235, Ikorodu Rd',
      centreAmount: '200000',
      centreCapacity: '50',
      centerIdNo: 0,
    });

    wrapper.find('#editButton').simulate('click', { preventDefault: () => { } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should spy on handleCenterDetails method and return true on Edit Center component', () => {
    const spy = sinon.spy(EditCenter.prototype, 'handleCenterDetails');
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setProps({
      centerState: [newCenter],
    });

    wrapper.setState({
      centerIdNo: 1,
    });

    wrapper.find('#editCenterDetails').simulate('click', { preventDefault: () => { } });
    expect(spy.called).to.be.equal(true);
    spy.restore();
  });

  it('Should updates clearImagePath in the state', () => {
    wrapper.instance().handleImageUpload({ target: { files: ['/user/path/to/file'], value: '/user/path/to/file' } });
    expect(wrapper.state('files')).to.be.eqls('/user/path/to/file');
  });

  it('Should check if handlePagination was called', () => {
    wrapper.instance().handlePagination(10);
    expect(wrapper.state('currentPage')).to.be.eqls(10);
  });
});
