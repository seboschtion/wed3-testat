// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getIsAuthenticated, getUser, getToken } from '../services/auth';

type Props = {
  component: any,
  rest?: any,
};

export default class PrivateRoute extends React.Component<Props> {
  render() {
    const user = getUser();
    const token = getToken();
    if (getIsAuthenticated() && this.props.component) {
      return <Route {...this.props.rest} render={props => React.createElement(this.props.component, { ...props, user, token })} />;
    }
    return <Route {...this.props.rest} render={() => <Redirect to={{ pathname: '/login' }} />} />;
  }
}
