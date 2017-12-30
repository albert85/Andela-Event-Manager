import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from '../component/Home';
import SignUp from '../component/signUpPage';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
