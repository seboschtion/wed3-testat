// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import type State from './services/auth';
import { validate, defaultState, authenticate } from './services/auth';

import { Login, Signup, Dashboard, AllTransactions } from './pages';
import PrivateRoute from './routing/PrivateRoute';

export default class App extends React.Component<{}, State> {
  componentWillMount() {
    validate((s) => {
      this.setState(s);
    });
  }

  state = defaultState();

  render() {
    const { isAuthenticated, user, token } = this.state;
    return (
      <Router>
        <Switch>
          <Redirect exact path="/" to="/dashboard" />
          <Route path="/login" render={props => <Login {...props} authenticate={authenticate} />} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            token={token}
            component={Dashboard}
          />
          <PrivateRoute
            path="/transactions"
            isAuthenticated={isAuthenticated}
            token={token}
            user={user}
            component={AllTransactions}
          />
        </Switch>
      </Router>
    );
  }
}
