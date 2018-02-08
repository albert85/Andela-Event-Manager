import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../style.scss';
import loginAction from '../action/loginAction';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginDetails: {
        email: '',
        password: '',
      },
    };

    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleChangeEmailInput = this.handleChangeEmailInput.bind(this);
    this.handleChangePasswordInput = this.handleChangePasswordInput.bind(this);
    // sthis.checkIfExist = this.checkIfExist.bind(this);
  }

  componentDidMount() {
    // localStorage.removeItem('token');
  }

  /**
   * @method
   * @param {strings}
   * @returns{null}
   */
  handleChangeEmailInput(e) {
    this.setState({ loginDetails: Object.assign(this.state.loginDetails, { email: e.target.value }) });
    return true;
  }

  /**
   * @method
   * @param {strings}
   * @returns{null}
   */
  handleChangePasswordInput(e) {
    this.setState({ loginDetails: Object.assign(this.state.loginDetails, { password: e.target.value }) });
    return true;
  }

  /**
 * @method
 * @param {object} loginDetail
 * @returns {strings}
 */
  handleUserLogin() {
    // loginDetail.preventDefault();
    const userLoginDetails = {
      email: this.state.loginDetails.email,
      password: this.state.loginDetails.password,
    };

    // Login to generate token and get Id no
    this.props.loginUser(userLoginDetails);
  }

  // checkIfExist() {
  //   if (this.props.loginUserDetail === 'successfully login') {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    return (
      <div className="section-sign-in">
        <div className="cover-section-signin">
          <div className="container" >
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="sigin-section">
                  <form className="p-4 text-white sigininnersection" name="signInForm" onSubmit={this.handleUserLogin}>
                    <h3 className="text-center">SIGN IN</h3>
                    <hr className="hr" /><br />
                      <span id='loginErroMessage' className='text-danger'></span>
                      <div className="form-group">

                        <label htmlFor="inputEmail">Email</label>
                        <input type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="you@example.com"
                        required
                        onChange = { this.handleChangeEmailInput } />
                      </div>

                        <div className="form-group">
                          <label htmlFor="inputPassword">Password</label>
                          <input type="password"
                          className="form-control"
                          id="inputPassword"
                          placeholder="**********"
                          required
                          onChange = { this.handleChangePasswordInput } />
                        </div>

                          <div className="row text-center">
                            <div className="col-md-6 col-sm-6">
                              <button type="button"
                              className="btn btn-primary btn-lg btn-block" 
                              onClick = { this.handleUserLogin }
                              >SIGN IN </button>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <a href="/signup" className="btn btn-danger btn-lg btn-block">SIGN UP</a>
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
  loginUserDetail: state.loginUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser: loginAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

