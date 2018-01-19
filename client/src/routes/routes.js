import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import login from '../component/home.js';
import signUp from '../component/signUpPage.js';
import eventHomePage from '../component/eventHomePage.js';
import centers from '../component/centers.js';
import centerDetails from '../component/centerDetails.js';
import  bookingDetails from '../component/viewBookings.js';

class App extends React.Component {
  render() {
    return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={login} />
                    <Route path="/signup" component={signUp} />
                    <Route path="/event-home-page" component={eventHomePage} />
                    <Route path="/centers" component={centers} />
                    <Route path="/booking-details" component={bookingDetails} />
                    <Route path="/center-details" component={centerDetails} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
    );
  }
}

export default App;
