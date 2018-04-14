import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../style.scss';
import addUserAction from '../action/signUpAction';
import Footer from './Footer';

export class SignUp extends Component {
  /**
     * @constructor
     * @param {*} props
     */
  constructor(props) {
    super(props);
    this.state = {
      signUpDetails: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
      },
      errorPassword: false,
      checkAdminStatus: false,
    };
    // this.signUpNewUser = this.signUpNewUser.bind(this);

    // this.checkPassword = this.checkPassword.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
    this.handleSignUpNewUser = this.handleSignUpNewUser.bind(this);
  }

  /**
 * @method
 * @param {none}
 * @returns {strings}
 */

  // It handles saving first name to the state
  handleFirstNameInput(e) {
    this.setState({ signUpDetails: Object.assign(this.state.signUpDetails, { firstName: e.target.value }) });
    return true;
  }
  // it handles saving last name to the state
  handleLastNameInput(e) {
    this.setState({ signUpDetails: Object.assign(this.state.signUpDetails, { lastName: e.target.value }) });
    return true;
  }

  // it handles saving email address to the state
  handleEmailInput(e) {
    this.setState({ signUpDetails: Object.assign(this.state.signUpDetails, { email: e.target.value }) });
    return true;
  }

  // it handles saving password to the state
  handlePasswordInput(e) {
    this.setState({ signUpDetails: Object.assign(this.state.signUpDetails, { password: e.target.value }) });
    return true;
  }

  // it handles saving confirm password top the state
  handleConfirmPasswordInput(e) {
    this.setState({ signUpDetails: Object.assign(this.state.signUpDetails, { confirmPassword: e.target.value }) });

    return true;
  }


  handleSignUpNewUser(e) {
    e.preventDefault();
    let isAdminStatus = false;
    // console.log('signup');
    if (this.state.signUpDetails.password !== this.state.signUpDetails.confirmPassword) {
      window.document.getElementById('errorMessage').innerHTML = 'wrong password';
      return this.setState({ errorPassword: true });
    }

    if (this.state.signUpDetails.password === 'admin') {
      isAdminStatus = true;
      this.setState({ checkAdminStatus: true });
    }

    const userDetails = {
      firstName: this.state.signUpDetails.firstName,
      lastName: this.state.signUpDetails.lastName,
      email: this.state.signUpDetails.email,
      password: this.state.signUpDetails.password,
      isAdmin: isAdminStatus,
    };

    this.props.signUpNewUser(userDetails);
    return true;
  }

  /**
 * @method
 * @param {object}
 * @returns {strings}
 */


  render() {
    return (
      <div className="section-signUp">
        <div className="cover-section-signup">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="sigUpsection">
                  <form
                    className="p-4 text-white mt-5 sigUpinnersection"
                    onSubmit={this.handleSignUpNewUser} >
                    <h3 className="text-center">SIGN UP</h3>
                    <hr className="hr" />

                    <div className="form-group">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        type="text"
                        id="firstname"
                        className="form-control"
                        placeholder="First Name"
                        aria-describedby="helpId"
                        onChange={this.handleFirstNameInput}
                        required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        type="text"
                        id="lastname"
                        className="form-control"
                        placeholder="Last Name"
                        aria-describedby="helpId"
                        onChange={this.handleLastNameInput}
                        required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="signupemail">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="signupemail"
                        aria-describedby="emailHelp"
                        placeholder="you@example.com"
                        onChange={this.handleEmailInput}
                        required />
                      <span id='existingEmail' className='text-danger'></span>

                    </div>

                    <div className="form-group">
                      <label htmlFor="siguppassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="siguppassword"
                        placeholder="**********" required ref='userPassword'
                        onChange={this.handlePasswordInput}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="signupconfirmpassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="signupconfirmpassword"
                        placeholder="**********"
                        required
                        onKeyUp={this.checkPassword}
                        onChange={this.handleConfirmPasswordInput}
                      />
                      <span id='errorMessage' className='text-danger'></span>
                    </div>

                    <div className="row text-center">
                      <div className="col-md-12 col-sm-12">
                        <button
                          type="submit"
                          className="btn btn-danger btn-lg btn-block"

                        >
                          <strong>
                            SIGN UP</strong>
                        </button>
                      </div>

                    </div>

                  </form>
                </div>
              </div>

            </div>

          </div>
        </div>
        <Footer />
      </div>
 
    );
  }
}

const mapStateToProps = state => ({
  newUserDetail: state.signUpUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signUpNewUser: addUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
