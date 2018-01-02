

import React from 'react';
import { Link } from 'react-router';


import '../../style.scss';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDetails: {},
    };
  }
  render() {
    return (
      <div className="section-sign-in">
        <div className="cover-section-signin">
          <div className="container" >
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="sigin-section">
                  <form className="p-4 text-white sigininnersection" name="signInForm" action="userpage.html">
                    <h3 className="text-center">SIGN IN</h3>
                    <hr className="hr" /><br />

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

export default Home;
