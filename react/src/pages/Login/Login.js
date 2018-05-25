// @flow

import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { ComponentTitle } from '../../components';

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (
    login: string,
    password: string,
    callback: (error: ?Error) => void
  ) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {
      from: string
    }
  }
};

class Login extends React.Component<Props, *> {
  state = {
    login: '',
    password: '',
    error: undefined,
    redirectToReferrer: false,
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, password } = this.state;
    this.props.authenticate(login, password, (error) => {
      if (error) {
        this.setState({ error });
      } else {
        this.setState({ redirectToReferrer: true, error: null });
      }
    });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' },
    };
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="entry-page">
        <h1>Red Bank of North Koreact</h1>
        <div className="window entry-form">
          <ComponentTitle title="Login" />
          <div className="window-content">
            <Form>
              <label>
                Username
                <input
                  onChange={this.handleLoginChanged}
                  placeholder="Login"
                  value={this.state.login}
                />
              </label>
              {this.state.login && this.state.login.length < 3
                ? 'Bitte geben Sie mindestens 3 Zeichen an.'
                : null}
              <label>
                Passwort
                <input
                  onChange={this.handlePasswordChanged}
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                />
              </label>
              {this.state.password && this.state.password.length < 3
                ? 'Bitte geben Sie mindestens 3 Zeichen an.'
                : null}
              <Button onClick={this.handleSubmit}>Login</Button>
              {error && <p className="error">Es ist ein Fehler aufgetreten!</p>}
            </Form>
            <Link to="/signup">
              Noch kein Account? Registrieren Sie sich hier!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
