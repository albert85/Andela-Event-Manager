import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './src/component/Home';

render(
  <Router>
    <Route exact path='/' component={ Home } />
    </Router>,
  document.getElementById('root'),
);

