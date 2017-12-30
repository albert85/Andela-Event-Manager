import React from 'react';

import '../../style.scss';
// import { connect } from 'react-redux';

// function mapStateToProps(state) {
//     return {

//     };
// }

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpDetails: {},
    };
  }
  render() {
    return (
            <div className="section-signUp">
                <div className="cover-section-signup">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className="sigUpsection">
                                    <form className="p-4 text-white mt-5 sigUpinnersection">
                        <h3 className="text-center">SIGN UP</h3>
                        <hr className="hr" />

                        <div className="form-group">
                          <label htmlFor="firstname">First Name</label>
                          <input type="text" id="firstname" className="form-control" placeholder="e.g.Charles" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname" className="form-control" placeholder="e.g.Andy" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signupemail">Email address</label>
                            <input type="email" className="form-control" id="signupemail" aria-describedby="emailHelp" placeholder="you@example.com" />

                        </div>

                        <div className="form-group">
                            <label htmlFor="siguppassword">Password</label>
                            <input type="password" className="form-control" id="siguppassword" placeholder="**********" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signupconfirmpassword">Confirm Password</label>
                            <input type="password" className="form-control" id="signupconfirmpassword" placeholder="**********" />
                        </div>

                        <div className="row text-center">
                            <div className="col-md-12 col-sm-12">
                                <button type="submit" onClick = {this.signingUp} className="btn btn-danger btn-lg btn-block"><strong> SIGN UP</strong></button>
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

export default SignUp
;