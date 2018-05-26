// @flow

import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { Page, Window } from '../../components';
import { authenticate } from '../../services/auth';

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {
      from: string,
    },
  },
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
    authenticate(
      login,
      password,
      (newState) => {
        this.setState({ redirectToReferrer: true, error: undefined });
      },
      error => this.setState({ error }),
    );
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
      <Page>
        <Window title="Login">
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
          <Link to="/signup">Noch kein Account? Registrieren Sie sich hier!</Link>
        </Window>
      </Page>
    );
  }
}

export default Login;
