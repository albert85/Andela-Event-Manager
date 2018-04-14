import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BookingDetails } from '../src/component/viewBookings';
// import ViewBookHeader from '../src/component/viewBookings';


configure({ adapter: new Adapter() });

describe('<BookingDetails />', () => {
  let wrapper;
  const props = {
    centerState: [],
    getACenterState: [],
    getAllCenterAction: () => {},
    getACenterAction: () => {},
    // signUpNewUser: () => {},

  };

  beforeEach(() => {
    wrapper = shallow(<BookingDetails { ...props } />);
  });

  it('Should return number of ViewBookingHeader field on View Booking page', () => {
      console.log(wrapper);
    expect(wrapper.find('.container')).to.have.length(1);
  });

//   it('Should return number of button on Signup page', () => {
//     expect(wrapper.find('button')).to.have.length(1);
//   });

//   it('Should check if the wrapper contains instance of Signup page', () => {
//     expect(wrapper.instance()).to.be.instanceof(SignUp);
//   });

//   it('Should check if firstName is supplied on the Signup page', () => {
//     const OldState = wrapper.state().signUpDetails;
//     wrapper.setState({ signUpDetails: Object.assign(OldState, { firstName: 'Olarewaju' }) });
//     // console.log(wrapper.instance());
//     expect(wrapper.state().signUpDetails.firstName).to.be.equal('Olarewaju');
//   });

//   it('Should check if lastName is supplied on the Signup page', () => {
//     const OldState = wrapper.state().signUpDetails;
//     wrapper.setState({ signUpDetails: Object.assign(OldState, { lastName: 'Temitope' }) });
//     // console.log(wrapper.instance());
//     expect(wrapper.state().signUpDetails.lastName).to.be.equal('Temitope');
//   });

//   it('Should check if password is supplied on the Signup page', () => {
//     const OldState = wrapper.state().signUpDetails;
//     wrapper.setState({ signUpDetails: Object.assign(OldState, { password: '12345' }) });
//     // console.log(wrapper.instance());
//     expect(wrapper.state().signUpDetails.password).to.be.equal('12345');
//   });

//   it('Should check if email is supplied on the Signup page', () => {
//     const OldState = wrapper.state().signUpDetails;
//     wrapper.setState({ signUpDetails: Object.assign(OldState, { email: 'you@gmail.com' }) });
//     // console.log(wrapper.instance());
//     expect(wrapper.state().signUpDetails.email).to.be.equal('you@gmail.com');
//   });

//   it('Should check if user is Admin', () => {
//     const OldState = wrapper.state().signUpDetails;
//     wrapper.setState({ signUpDetails: Object.assign(OldState, { isAdmin: true }) });
//     // console.log(wrapper.instance());
//     expect(wrapper.state().signUpDetails.isAdmin).to.be.equal(true);
//   });

//   it('Should handle and store user firstname', () => {
//     expect(wrapper.instance().handleFirstNameInput({ target: { value: 'firstname' } })).to.be.equal(true);
//   });

//   it('Should handle and store user lastname', () => {
//     expect(wrapper.instance().handleLastNameInput({ target: { value: 'lastname' } })).to.be.equal(true);
//   });

//   it('Should handle and store user email', () => {
//     expect(wrapper.instance().handleEmailInput({ target: { value: 'email' } })).to.be.equal(true);
//   });

//   it('Should handle and store user password', () => {
//     expect(wrapper.instance().handlePasswordInput({ target: { value: 'password' } })).to.be.equal(true);
//   });

//   it('Should handle and store user confirm password', () => {
//     expect(wrapper.instance().handleConfirmPasswordInput({ target: { value: 'confirm password' } })).to.be.equal(true);
//   });

//   it('Should handle signing up new user', () => {
//     expect(wrapper.instance().handleSignUpNewUser({ preventDefault: () => {} })).to.be.equal(true);
//   });

//   it('Should check password and confirm password field contains the value', () => {
//     const OldState = wrapper.state().signUpDetails;
//     wrapper.setState({ signUpDetails: Object.assign(OldState, { password: 'admin', confirmPassword: 'admin' }) });
//     // wrapper.find('button').simulate('onSubmit');
//     wrapper.instance().handleSignUpNewUser({ preventDefault: () => {} });
//     expect(wrapper.state().checkAdminStatus).to.be.equal(true);
//     // expect(wrapper.instance().handleSignUpNewUser({ preventDefault: () => {} })).to.be.equal(true);
//   });

  // it('Should check if user is admin', () => {
  //   const OldState = wrapper.state().signUpDetails;
  //   wrapper.setState({ signUpDetails: Object.assign(OldState, { password: '1258', confirmPassword: '1254' }) });
  //   wrapper.instance().handleSignUpNewUser({ preventDefault: () => {} });
  //   expect(wrapper.state().errorPassword).to.be.equal(true);
  // });

//   it('Should return the number of .container class ', () => {
//     expect(wrapper.find('.container')).to.have.length(1);
//   });

//   it('Should return the number of form on signup page ', () => {
//     expect(wrapper.find('form')).to.have.length(1);
//   });

//   it('Should return the number of form-group on signup page ', () => {
//     expect(wrapper.find('.form-group')).to.have.length(5);
//   });

//   it('Should return the number of section-signUp class on signup page ', () => {
//     expect(wrapper.find('.section-signUp')).to.have.length(1);
//   });

//   it('Should return the number of cover-section-signup on signup page ', () => {
//     expect(wrapper.find('.cover-section-signup')).to.have.length(1);
//   });
});
