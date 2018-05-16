import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignUp } from '../src/component/SignUpPage';


configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
  let wrapper;
  const props = {
    signUpNewUser: () => {},

  };


  it('Should return number of input field on Signup page', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.find('input')).to.have.length(5);
  });

  it('Should return number of button on Signup page', () => {
    expect(wrapper.find('button')).to.have.length(1);
    wrapper = shallow(<SignUp { ...props } />);
  });

  it('Should check if the wrapper contains instance of Signup page', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.instance()).to.be.instanceof(SignUp);
  });

  it('Should check if firstName is supplied on the Signup page', () => {
    wrapper = shallow(<SignUp { ...props } />);
    const OldState = wrapper.state().signUpDetails;
    wrapper.setState({ signUpDetails: Object.assign(OldState, { firstName: 'Olarewaju' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().signUpDetails.firstName).to.be.equal('Olarewaju');
  });

  it('Should check if lastName is supplied on the Signup page', () => {
    wrapper = shallow(<SignUp { ...props } />);
    const OldState = wrapper.state().signUpDetails;
    wrapper.setState({ signUpDetails: Object.assign(OldState, { lastName: 'Temitope' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().signUpDetails.lastName).to.be.equal('Temitope');
  });

  it('Should check if password is supplied on the Signup page', () => {
    wrapper = shallow(<SignUp { ...props } />);
    const OldState = wrapper.state().signUpDetails;
    wrapper.setState({ signUpDetails: Object.assign(OldState, { password: '12345' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().signUpDetails.password).to.be.equal('12345');
  });

  it('Should check if email is supplied on the Signup page', () => {
    wrapper = shallow(<SignUp { ...props } />);
    const OldState = wrapper.state().signUpDetails;
    wrapper.setState({ signUpDetails: Object.assign(OldState, { email: 'you@gmail.com' }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().signUpDetails.email).to.be.equal('you@gmail.com');
  });

  it('Should check if user is Admin', () => {
    wrapper = shallow(<SignUp { ...props } />);
    const OldState = wrapper.state().signUpDetails;
    wrapper.setState({ signUpDetails: Object.assign(OldState, { isAdmin: true }) });
    // console.log(wrapper.instance());
    expect(wrapper.state().signUpDetails.isAdmin).to.be.equal(true);
  });

  it('Should handle and store user firstname', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.instance().handleFirstNameInput({ target: { value: 'firstname' } })).to.be.equal(true);
  });

  it('Should handle and store user lastname', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.instance().handleLastNameInput({ target: { value: 'lastname' } })).to.be.equal(true);
  });

  it('Should handle and store user email', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.instance().handleEmailInput({ target: { value: 'email' } })).to.be.equal(true);
  });

  it('Should handle and store user password', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.instance().handlePasswordInput({ target: { value: 'password' } })).to.be.equal(true);
  });

  it('Should handle and store user confirm password', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.instance().handleConfirmPasswordInput({ target: { value: 'confirm password' } })).to.be.equal(true);
  });

  it('Should handle signing up new user', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.instance().handleSignUpNewUser({ preventDefault: () => {} })).to.be.equal(true);
  });

  it('Should check password and confirm password field contains the value', () => {
    wrapper = shallow(<SignUp { ...props } />);
    const OldState = wrapper.state().signUpDetails;
    wrapper.setState({ signUpDetails: Object.assign(OldState, { password: 'admin', confirmPassword: 'admin' }) });
    // wrapper.find('button').simulate('onSubmit');
    wrapper.instance().handleSignUpNewUser({ preventDefault: () => {} });
    expect(wrapper.state().checkAdminStatus).to.be.equal(true);
    // expect(wrapper.instance().handleSignUpNewUser({ preventDefault: () => {} })).to.be.equal(true);
  });

  it('Should return the number of .container class ', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.find('.container')).to.have.length(1);
  });

  it('Should return the number of form on signup page ', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('Should return the number of form-group on signup page ', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.find('.form-group')).to.have.length(5);
  });

  it('Should return the number of section-signUp class on signup page ', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.find('.section-signUp')).to.have.length(1);
  });

  it('Should return the number of cover-section-signup on signup page ', () => {
    wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.find('.cover-section-signup')).to.have.length(1);
  });

  it('Should return true when it spy on on handlelocation on signup component', () => {
    const spy = sinon.spy(SignUp.prototype, 'handleSignUpNewUser');
    wrapper = shallow(<SignUp {...props} />);
    wrapper.setState({
      signUpDetails: {
        firstName: 'First nane',
        lastName: 'last name',
        email: 'you@example.com',
        password: '12345',
        confirmPassword: '12345',
        isAdmin: false,
      },
    })
    wrapper.find('.sigUpinnersection').simulate('submit',{ preventDefault:() => {}});
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });

  it('Should return true when it spy on on handlelocation on signuop component', () => {
    const spy = sinon.spy(SignUp.prototype, 'handleSignUpNewUser');
    wrapper = shallow(<SignUp {...props} />);
    wrapper.setState({
      signUpDetails: {
        firstName: 'First nane',
        lastName: 'last name',
        email: 'you@example.com',
        password: '12345',
        confirmPassword: '123456',
        isAdmin: false,
      },
    })
    wrapper.find('.sigUpinnersection').simulate('submit',{ preventDefault:() => {}});
    expect(spy.called).to.be.equal(true);
    spy.restore();
  
  });
});
