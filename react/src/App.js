// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { authenticate } from './services/auth';

import { Login, Signup, Dashboard, AllTransactions } from './pages';
import PrivateRoute from './routing/PrivateRoute';

export default class App extends React.Component<{}> {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact path="/" to="/dashboard" />
          <Route path="/login" render={props => <Login {...props} authenticate={authenticate} />} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/transactions" component={AllTransactions} />
        </Switch>
      </Router>
    );
  }
}
