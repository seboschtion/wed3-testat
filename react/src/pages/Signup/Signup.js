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
    error: null,
    redirect: false,
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

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const {
      login, firstname, lastname, password,
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
        <Window title="Registrierung">
          <Form>
            <Input label="Vorname" onChange={this.handleFirstNameChanged} value={this.state.firstname} />
            <Input label="Nachname" onChange={this.handleLastNameChanged} value={this.state.lastname} />
            <Input label="Benutzername" onChange={this.handleLoginChanged} value={this.state.login} />
            <Input label="Passwort" onChange={this.handlePasswordChanged} value={this.state.password} type="password" />
            <Button onClick={this.handleSubmit}>Account eröffnen</Button>
            {error && <p className="error">Es ist ein Fehler aufgetreten!</p>}
          </Form>
        </Window>
      </Page>
    );
  }
}
