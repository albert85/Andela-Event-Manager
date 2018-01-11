import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import login from '../component/home';
import signUp from '../component/signUpPage';
import eventHomePage from '../component/eventHomePage';
import centers from '../component/centers';
import centerDetails from '../component/centerDetails';

class App extends React.Component {
  render() {
    return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={login} />
                    <Route path="/signup" component={signUp} />
                    <Route path="/event-home-page" component={eventHomePage} />
                    <Route path="/centers" component={centers} />
                    <Route path="/center-details" component={centerDetails} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
    );
  }
}

export default App;
