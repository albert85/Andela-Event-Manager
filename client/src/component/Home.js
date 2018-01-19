import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../style.scss';
import loginAction from '../action/loginAction';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  /**
 * @method
 * @param {object} loginDetail
 * @returns {strings}
 */
  handleUserLogin(loginDetail) {
    loginDetail.preventDefault();
    const userLoginDetails = {
      email: loginDetail.target[0].value,
      password: loginDetail.target[1].value,
    };

    this.props.loginUser(userLoginDetails);

    if (localStorage.getItem('message') === 'successfully login') {
      if (userLoginDetails.password === 'admin') {
        return this.props.history.push('/centers');
      }
      return this.props.history.push('/event-home-page');
    }
    return window.document.getElementById('loginErroMessage').innerHTML = 'Wrong password and email';
  }

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
                        <input type="email" className="form-control" id="inputEmail" placeholder="you@example.com" required />
                      </div>

                        <div className="form-group">
                          <label htmlFor="inputPassword">Password</label>
                          <input type="password" className="form-control" id="inputPassword" placeholder="**********" required />
                        </div>

                          <div className="row text-center">
                            <div className="col-md-6 col-sm-6">
                              <button type="submit" className="btn btn-primary btn-lg btn-block" >SIGN IN </button>
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

