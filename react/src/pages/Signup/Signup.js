// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { Window, Page, Input } from '../../components';
import { signup } from '../../services/api';

export default class Signup extends React.Component<{}, *> {
  state = {
    login: '',
    firstname: '',
    lastname: '',
    password: '',
    passwordConfirmation: '',
    error: null,
    redirect: false,
    errorMessage: 'Bitte geben Sie mindestens 3 Zeichen an.',
    passwordConfirmationErrorMessage: '',
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value });
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handlePasswordConfirmationChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ passwordConfirmation: event.target.value });

      if(this.state.password.length > 2 && this.state.passwordConfirmation.length > 2 && this.state.password !== this.state.passwordConfirmation) {
        this.setState({passwordConfirmationErrorMessage: 'Passwörter stimmen nicht überein.'});
      }
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const {
      login, firstname, lastname, password, passwordConfirmation
    } = this.state;
    signup(login, firstname, lastname, password)
      .then(() => {
        this.setState({ redirect: true, error: null });
      })
      .catch(error => this.setState({ redirect: false, error }));
  };

  render() {
    const { redirect, error } = this.state;

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Page>
        <Window center title="Registrierung">
          <Form>
            <Input label="Vorname" onChange={this.handleFirstNameChanged} value={this.state.firstname} />
            {this.state.firstname && this.state.firstname.length < 3 ? this.state.errorMessage : null}
            <Input label="Nachname" onChange={this.handleLastNameChanged} value={this.state.lastname} />
            {this.state.lastname && this.state.lastname.length < 3 ? this.state.errorMessage : null}
            <Input label="Benutzername" onChange={this.handleLoginChanged} value={this.state.login} />
            {this.state.login && this.state.login.length < 3 ? this.state.errorMessage : null}
            <Input label="Passwort" onChange={this.handlePasswordChanged} value={this.state.password} type="password" />
            {this.state.password && this.state.password.length < 3 ? this.state.errorMessage : null}
            <Input label="Passwort bestätigen" onChange={this.handlePasswordConfirmationChanged} value={this.state.passwordConfirmation} type="password" />
            {this.state.password && this.state.password.length < 3 ? this.state.errorMessage : null} {this.state.passwordConfirmationErrorMessage}
            <Button onClick={this.handleSubmit} disabled={!this.state.firstname || !this.state.lastname || !this.state.login || !this.state.password || !this.state.passwordConfirmation }>Account eröffnen</Button>
            {error && <p className="error">Es ist ein Fehler aufgetreten!</p>}
          </Form>
        </Window>
      </Page>
    );
  }
}
