import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from '../src/component/Home';


configure({ adapter: new Adapter() });

describe('<LogIn />', () => {
  let wrapper;
  const props = {
    loginUser: () => {},

  };

  beforeEach(() => {
    wrapper = shallow(<Home { ...props } />);
  });

  it('Should return number of input field on Login page', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('Should return number of button on Login page', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });


  it('Should return number of anchor a on Login page', () => {
    expect(wrapper.find('a')).to.have.length(1);
  });

  it('Should check if the wrapper contains instance of Signup page', () => {
    expect(wrapper.instance()).to.be.instanceof(Home);
  });

  it('Should check if emil is supplied on the login page', () => {
    const OldState = wrapper.state().loginDetails;
    wrapper.setState({ loginDetails: Object.assign(OldState, { email: 'Olarewaju@example.com' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().loginDetails.email).to.be.equal('Olarewaju@example.com');
  });

  it('Should check if password is supplied on the Signup page', () => {
    const OldState = wrapper.state().loginDetails;
    wrapper.setState({ loginDetails: Object.assign(OldState, { password: 'Temitope' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().loginDetails.password).to.be.equal('Temitope');
  });

  it('Should handle and store user email', () => {
    expect(wrapper.instance().handleChangeEmailInput({ target: { value: 'you@example.com' } })).to.be.equal(true);
  });

  it('Should handle and store user password', () => {
    expect(wrapper.instance().handleChangePasswordInput({ target: { value: '12345' } })).to.be.equal(true);
  });

  it('Should user login', () => {
    expect(wrapper.instance().handleUserLogin()).to.be.equal(true);
  });

  it('Should return the number of .container class ', () => {
    expect(wrapper.find('.container')).to.have.length(1);
  });

  it('Should return the number of .sigin-section class ', () => {
    expect(wrapper.find('.sigin-section')).to.have.length(1);
  });

  it('Should return the number of .col-md-6 class ', () => {
    expect(wrapper.find('.col-md-6')).to.have.length(3);
  });

  it('Should return the number of offset-md-3 class ', () => {
    expect(wrapper.find('.offset-md-3')).to.have.length(1);
  });

  it('Should return the number of .loginErroMessage id ', () => {
    expect(wrapper.find('#loginErroMessage')).to.have.length(1);
  });

  it('Should return the number of form on signup page ', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return the number of form-group on signup page ', () => {
    expect(wrapper.find('.form-group')).to.have.length(2);
  });

  it('Should return the number of section-signUp class on signup page ', () => {
    expect(wrapper.find('.section-sign-in')).to.have.length(1);
  });

  it('Should return the number of cover-section-signup on signup page ', () => {
    expect(wrapper.find('.cover-section-signin')).to.have.length(1);
  });
});
