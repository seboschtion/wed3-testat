// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { Window, Page, Input } from '../../components';
import { signup } from '../../services/api';
import { authenticate } from '../../services/auth';

export default class Signup extends React.Component<{}, *> {
  state = {
    login: '',
    firstname: '',
    lastname: '',
    password: '',
    passwordConfirmation: '',
    error: null,
    redirect: false,
    passwordConfirmationErrorMessage: '',
  };

  onTextChanged = (e: Event) => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name === 'password' || name === 'passwordConfirmation') {
          this.setPasswordEqualsPasswordConfirmation();
        }
      },
    );
  };

  setPasswordEqualsPasswordConfirmation = () => {
    if (this.getPasswordEqualsPasswordConfirmation()) {
      this.setState({ passwordConfirmationErrorMessage: '' });
    } else {
      this.setState({ passwordConfirmationErrorMessage: 'Passwörter stimmen nicht überein.' });
    }
  };

  getPasswordEqualsPasswordConfirmation = () => this.state.password.length < 3 || this.state.password === this.state.passwordConfirmation;

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const {
      login, firstname, lastname, password,
    } = this.state;
    signup(login, firstname, lastname, password)
      .then(() => {
        authenticate(login, password, () => {
          this.setState({ redirect: true, error: null });
        });
      })
      .catch(error => this.setState({ redirect: false, error }));
  };

  isFormCompleted = () =>
    this.state.firstname &&
    this.state.lastname &&
    this.state.login &&
    this.state.password &&
    this.state.passwordConfirmation &&
    this.isMinlengthEnsured() &&
    this.getPasswordEqualsPasswordConfirmation();

  isMinlengthEnsured = () =>
    this.state.firstname.length > 2 &&
    this.state.lastname.length > 2 &&
    this.state.login.length > 2 &&
    this.state.password.length > 2 &&
    this.state.passwordConfirmation.length > 2;

  render() {
    const { redirect, error } = this.state;

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    const formCompleted = this.isFormCompleted();

    return (
      <Page>
        <Window center title="Registrierung">
          <Form>
            <Input name="firstname" label="Vorname" onChange={e => this.onTextChanged(e)} value={this.state.firstname} min={3} />
            <Input name="lastname" label="Nachname" onChange={e => this.onTextChanged(e)} value={this.state.lastname} min={3} />
            <Input name="login" label="Benutzername" onChange={e => this.onTextChanged(e)} value={this.state.login} min={3} />
            <Input name="password" label="Passwort" onChange={e => this.onTextChanged(e)} value={this.state.password} type="password" min={3} />
            <Input
              name="passwordConfirmation"
              label="Passwort bestätigen"
              onChange={e => this.onTextChanged(e)}
              value={this.state.passwordConfirmation}
              type="password"
            />
            <small className="error">{this.state.passwordConfirmationErrorMessage}</small>
            <Button onClick={this.handleSubmit} disabled={!formCompleted}>
              Account eröffnen
            </Button>
            {error && <small className="error">Es ist ein Fehler aufgetreten!</small>}
          </Form>
        </Window>
      </Page>
    );
  }
}
