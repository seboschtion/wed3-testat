// @flow

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { Page, Window } from '../../components';

type Props = {
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
};

type State = {
  login: string,
  password: string,
  error: any,
  redirect: boolean,
};

class Login extends React.Component<Props, State> {
  state: State = {
    login: '',
    password: '',
    error: undefined,
    redirect: false,
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
    this.props.authenticate(
      login,
      password,
      (s) => {
        this.setState({ redirect: true });
      },
      error => this.setState({ error }),
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
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
            {this.state.error && <p className="error">Es ist ein Fehler aufgetreten!</p>}
          </Form>
          <Link to="/signup">Noch kein Account? Registrieren Sie sich hier!</Link>
        </Window>
      </Page>
    );
  }
}

export default Login;