import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropType from 'prop-types';
import DisplayLoading from './loadingBar/LoadingBar';

import '../../style.scss';
import loginAction from '../action/loginAction';
import Footer from './Footer';

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

  /**
   * @method
   * @param {strings}
   * @returns{boolean}
   */
  handleChangeEmailInput(e) {
    this.setState({ loginDetails: Object.assign(this.state.loginDetails, { email: e.target.value }) });
    return true;
  }

  /**
   * @method
   * @param {strings}
   * @returns{boolean}
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
    this.props.loginUser(userLoginDetails, this.props.history);
    return true;
  }


  render() {
    return (
      <div className="section-sign-in">
        <div className="cover-section-signin">
          <div className="container" >
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="signin-section">
                  <form className="p-4 text-white sigininnersection" name="signInForm" onSubmit={this.handleUserLogin}>
                    <h3 className="text-center">SIGN IN <i className="fa fa-sign-in"></i></h3>
                    <hr className="hr" />
                      <span id='loginErroMessage' className='text-danger'></span>
                      <div className="form-group">

                        <label htmlFor="inputEmail">Email</label>
                        <div className="input-group">
                        <div class="input-group-prepend">
                        <div class="input-group-text bg-primary"><i className="fa fa-envelope text-white"></i></div>
                        </div>
                        <input type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="you@example.com"
                        required
                        onChange = { this.handleChangeEmailInput } />
                        </div>
                      </div>

                        <div className="form-group">
                          <label htmlFor="inputPassword">Password</label>
                          <div className="input-group">
                          <div class="input-group-prepend">
                          <div class="input-group-text bg-primary"><i className="fa fa-lock text-white"></i></div>
                          </div>
                          <input type="password"
                          className="form-control"
                          id="inputPassword"
                          placeholder="**********"
                          required
                          onChange = { this.handleChangePasswordInput } />
                          </div>
                        </div>

                          <div className="row text-center">
                            <div className="col-md-12 col-sm-12">
                              <button type="button"
                              className="btn btn-primary btn-lg btn-block mb-2"
                              onClick = { this.handleUserLogin }
                              >
                              {
                                this.props.messageStatus.checkStatus.isLoading && (<DisplayLoading/>)
                              }
                              SIGN IN
                              </button>
                                Create a New Account? <a href="/signup" className="text-danger">SIGN UP</a>
                            </div>
                            {/* <div className="col-md-12 col-sm-12">
                            </div> */}
                         </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
     </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUserDetail: state.loginUser,
  messageStatus: state.messageStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser: loginAction,
}, dispatch);

Home.proptype = {
  loginUserDetail: PropType.arrayOf(PropType.array),
  messageStatus: PropType.object,
  loginUser: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

