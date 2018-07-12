import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CentreEventTable from '../../src/component/CentreEventTable';
import CentreEventList from '../../src/component/CentreEventList';
import mockData from '../../__mockData__/mockData';

configure({ adapter: new Adapter() });

describe('<CentreEventTable />', () => {
  let wrapper;
  const props = {
    getCentreEvent: [mockData.getEventResponse],
    checkNoEvent: false,
    checkRecordIfExist: true,
    messageStatus: {
      checkStatus: {
        isLoading: false,
        success: false,
        error: false,
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(<CentreEventTable {...props} />);
  });

  it('Should return number of table field on CentreEventTable component', () => {
    expect(wrapper.find('table')).toHaveLength(1);
  });

  it('Should return number of table head field on CentreEventTable component', () => {
    expect(wrapper.find('thead')).toHaveLength(1);
  });

  it('Should return number of table body field on CentreEventTable component', () => {
    expect(wrapper.find('tbody')).toHaveLength(1);
  });

  it('should render centre event table component', () => {
    expect(wrapper).toBeDefined();
  });

  it('should check if events are available in a centre', () => {
    wrapper.setProps({
      getCentreEvent: [{ name: 'wedding', eventDate: '2017-12-03' }],
    });
    expect(wrapper).toBeDefined();
  });
});
