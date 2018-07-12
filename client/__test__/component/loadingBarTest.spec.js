import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoadingBar from '../../src/component/loadingBar/LoadingBar';


configure({ adapter: new Adapter() });

describe('<LoadingBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoadingBar />);
  });


  it('should render LoadingBar component', () => {
    expect(wrapper).toBeDefined();
  });
});
