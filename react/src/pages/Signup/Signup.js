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

  handlePasswordConfirmationChanged = (event: Event) => {
      this.setState(
        { passwordConfirmation: event.target.value},
        () => {
          if(!this.passwordEqualsPasswordConfirmation()) {
            this.setState({passwordConfirmationErrorMessage: 'Passwörter stimmen nicht überein.'});
          } else {
            this.setState({passwordConfirmationErrorMessage: ''});
          }
      });
  };

  passwordEqualsPasswordConfirmation = () => {
    if(!this.state.password || !this.state.passwordConfirmation) {
      return false;
    }
    return this.state.password === this.state.passwordConfirmation;
  };

  onTextCahnged = (e: Event) => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
      .catch(error => this.setState({ redirect: false, error: error }));
  };

  isFormCompleted = () => {
    return this.state.firstname && this.state.lastname && this.state.login && this.state.password && this.state.passwordConfirmation && this.isMinlengthEnsured() && this.passwordEqualsPasswordConfirmation();
  };

  isMinlengthEnsured = () => {
    return this.state.firstname.length > 2 && this.state.lastname.length > 2 && this.state.login.length > 2 && this.state.password.length > 2 && this.state.passwordConfirmation.length > 2;
  };

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
            <Input name="firstname" label="Vorname" onChange={e => this.onTextCahnged(e)} value={this.state.firstname} />
            {this.state.firstname && this.state.firstname.length < 3 ? this.state.errorMessage : null}
            <Input name="lastname" label="Nachname" onChange={e => this.onTextCahnged(e)} value={this.state.lastname} />
            {this.state.lastname && this.state.lastname.length < 3 ? this.state.errorMessage : null}
            <Input name="login" label="Benutzername" onChange={e => this.onTextCahnged(e)} value={this.state.login} />
            {this.state.login && this.state.login.length < 3 ? this.state.errorMessage : null}
            <Input name="password" label="Passwort" onChange={e => this.onTextCahnged(e)} value={this.state.password} type="password" />
            {this.state.password && this.state.password.length < 3 ? this.state.errorMessage : null}
            <Input name="passwordConfirmation" label="Passwort bestätigen" onChange={this.handlePasswordConfirmationChanged} value={this.state.passwordConfirmation} type="password" />
            {this.state.password && this.state.password.length < 3 ? this.state.errorMessage : null} {this.state.passwordConfirmationErrorMessage}
            <Button onClick={this.handleSubmit} disabled={!formCompleted}>Account eröffnen</Button>
            {error && <p className="error">Es ist ein Fehler aufgetreten!</p>}
          </Form>
        </Window>
      </Page>
    );
  }
}
