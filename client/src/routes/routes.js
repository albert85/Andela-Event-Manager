import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import login from '../component/Home';
import signUp from '../component/signUpPage';
import eventHomePage from '../component/eventHomePage';
import centers from '../component/centers';
import centerDetails from '../component/centerDetails';
import bookingDetails from '../component/viewBookings';
import editEvents from '../component/editEvent';
import editCenter from '../component/editCenter';

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
                    <Route path="/edit-center-details" component={editCenter} />
                    <Route path="/edit-event" component={editEvents} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
    );
  }
}

export default App;
