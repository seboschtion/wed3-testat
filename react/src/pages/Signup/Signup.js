// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { ComponentTitle } from '../../components';
import { signup } from '../../services/api';

class Signup extends React.Component<{}, *> {
  state = {
    login: '',
    firstname: '',
    lastname: '',
    password: '',
    error: null,
    redirectToReferrer: false,
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
      .then((result) => {
        console.log('Signup result ', result);
        this.setState({ redirectToReferrer: true, error: null });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="entry-page">
        <h1>Red Bank of North Koreact</h1>
        <div className="window entry-form">
          <ComponentTitle title="Registrierung" />
          <div className="window-content">
            <Form>
              <label>
                Vorname
                <input
                  onChange={this.handleFirstNameChanged}
                  placeholder="Vorname"
                  value={this.state.firstname}
                />
              </label>

              <label>
                Nachname
                <input
                  onChange={this.handleLastNameChanged}
                  placeholder="Nachname"
                  value={this.state.lastname}
                />
              </label>

              <label>
                Username
                <input
                  onChange={this.handleLoginChanged}
                  placeholder="Username"
                  value={this.state.login}
                />
              </label>

              <label>
                Passwort
                <input
                  onChange={this.handlePasswordChanged}
                  placeholder="Passwort"
                  type="password"
                  value={this.state.password}
                />
              </label>
              <Button onClick={this.handleSubmit}>Account eröffnen</Button>
              {error && <p className="error">Es ist ein Fehler aufgetreten!</p>}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
