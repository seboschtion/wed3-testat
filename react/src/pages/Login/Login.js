// @flow
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { Page, Window, Input } from '../../components';

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
      () => {
        this.setState({ redirect: true });
      },
      error => this.setState({ error }),
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }

    const defaultMinlengthErrMsg = 'Bitte geben Sie mindestens 3 Zeichen an.';

    return (
      <Page>
        <Window center title="Login">
          <Form>
            <Input label="Benutzername" onChange={this.handleLoginChanged} value={this.state.login} />
            {this.state.login && this.state.login.length < 3 ? defaultMinlengthErrMsg : null}
            <Input label="Passwort" type="password" onChange={this.handlePasswordChanged} value={this.state.password} />
            {this.state.password && this.state.password.length < 3 ? defaultMinlengthErrMsg : null}
            <Button onClick={this.handleSubmit} disabled={(this.state.login.length < 3) || (this.state.password.length < 3)}>Login</Button>
            {this.state.error && <p className="error">Es ist ein Fehler aufgetreten!</p>}
          </Form>
          <Link to="/signup">Noch keinen Account? Registrieren Sie sich hier!</Link>
        </Window>
      </Page>
    );
  }
}

export default Login;
