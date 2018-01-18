import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../style.scss';
import addUserAction from '../action/signUpAction';

class SignUp extends React.Component {
  /**
     * @constructor
     * @param {*} props
     */
  constructor(props) {
    super(props);
    this.state = {
      signUpDetails: {},
    };
    this.signUpNewUser = this
      .signUpNewUser
      .bind(this);

    this.checkPassword = this
      .checkPassword
      .bind(this);
  }

  /**
 * @method
 * @param {none}
 * @returns {strings}
 */
  checkPassword() {
    if (this.refs.userPassword.value !== this.refs.userConfirmPassword.value) {
      return window.document.getElementById('errorMessage').innerHTML = 'wrong password';
    }
    return window.document.getElementById('errorMessage').innerHTML = ' ';
  }

  /**
 * @method
 * @param {object}
 * @returns {strings}
 */
  signUpNewUser(signUpUser) {
    signUpUser.preventDefault();
    let checkAdminStatus = false;

    if (signUpUser.target[3].value !== signUpUser.target[4].value) {
      return window.document.getElementById('errorMessage').innerHTML = 'wrong password';
    }

    if (signUpUser.target[3].value === 'admin') {
      checkAdminStatus = true;
    }
    const userDetails = {
      firstName: signUpUser.target[0].value,
      lastName: signUpUser.target[1].value,
      email: signUpUser.target[2].value,
      password: signUpUser.target[3].value,
      isAdmin: checkAdminStatus,
    };

    this.props.signUpNewUser(userDetails);

    // check if operation is successful and redirect to login page
    if (localStorage.getItem('message') === 'sucessful') {
      alert('Thank you for registering, click Ok to login');
      return this.props.history.push('/');
    }

    return window.document.getElementById('existingEmail').innerHTML = 'Email Already Registered to an Account';
  }

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
                                        onSubmit={this.signUpNewUser}>
                                        <h3 className="text-center">SIGN UP</h3>
                                        <hr className="hr"/>

                                        <div className="form-group">
                                            <label htmlFor="firstname">First Name</label>
                                            <input
                                                type="text"
                                                id="firstname"
                                                className="form-control"
                                                placeholder="e.g.Charles"
                                                aria-describedby="helpId" required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastname"
                                                className="form-control"
                                                placeholder="e.g.Andy"
                                                aria-describedby="helpId" required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="signupemail">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="signupemail"
                                                aria-describedby="emailHelp"
                                                placeholder="you@example.com" required />
                                                <span id='existingEmail' className = 'text-danger'></span>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="siguppassword">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="siguppassword"
                                                placeholder="**********" required ref='userPassword'/>
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
                                                ref='userConfirmPassword'/>
                                                <span id='errorMessage' className = 'text-danger'></span>
                                        </div>

                                        <div className="row text-center">
                                            <div className="col-md-12 col-sm-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-danger btn-lg btn-block">
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
