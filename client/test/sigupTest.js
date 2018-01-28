import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignUp } from '../src/component/signUpPage';


configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it('Should return number of input field on Signup page', () => {
    expect(wrapper.find('input')).to.have.length(5);
  });

  
});

