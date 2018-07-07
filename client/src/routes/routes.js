/* eslint-disable */
import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PropType from 'prop-types';

import login from '../component/Home';
import signUp from '../component/SignUpPage';
import eventHomePage from '../component/EventHomePage';
import centers from '../component/Centers';
import centerDetails from '../component/CenterDetails';
import bookingDetails from '../component/ViewBookings';
import editEvents from '../component/EditEvent';
import editCenter from '../component/EditCenter';

export const AuthRoute = ({ component: Component, ...prop }) => (  
  <Route {...prop} render={props => (
    localStorage.getItem('token') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends React.Component {
  render() {
    return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={login} />
                    <Route path="/signup" component={signUp} />
                    <AuthRoute path="/event-home-page" component={eventHomePage} />
                    <AuthRoute path="/centers" component={centers} />
                    <AuthRoute path="/booking-details" component={bookingDetails} />
                    <AuthRoute path="/center-details" component={centerDetails} />
                    <AuthRoute path="/edit-center-details" component={editCenter} />
                    <AuthRoute path="/edit-event" component={editEvents} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
    );
  }
}

App.propType = {
  AuthRoute: PropType.func.isRequired
}

export default App;
