import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Window } from '../index';
import * as api from '../../services/api';

class NewTransaction extends React.Component {
  componentDidMount() {
    api.getAccountDetails(this.props.token).then((value) => {
      this.setState({
        transactionFromId: value.accountNr,
        balance: value.amount,
      });
    });
  }

  state = {
    transactionFromId: 0,
    balance: 0,
    transactionToId: '',
    transactionToName: 'Bitte geben Sie den Empfänger ein',
    submitWarning: '',
    amount: '',
    transferResult: null,
  };

  submitTransaction = (event) => {
    event.preventDefault();

    if (this.state.balance < this.state.amount) {
      this.setState({
        submitWarning: 'Der Betrag ist grösser als der momentane Kontostand.',
      });
      return;
    }

    api
      .transfer(this.state.transactionToId, this.state.amount, this.props.token)
      .then((transferResult) => {
        this.setState({
          transferResult,
          balance: transferResult.total,
        });
        this.props.transactionCallback();
      });
  };

  transactionToChanged = (event) => {
    this.setState({ transactionToId: event.target.value });
    api
      .getAccount(event.target.value, this.props.token)
      .then((value) => {
        this.setState({
          transactionToName: `${value.owner.firstname} ${value.owner.lastname}`,
        });
      })
      .catch((reason) => {
        this.setState({ transactionToName: 'Unbekannt' });
      });
  };

  amountChanged = (event) => {
    this.setState({
      amount: event.target.value,
      submitWarning: '',
    });
  };

  clearSuccessfulTransaction = (event) => {
    this.setState({
      transactionToId: '',
      transactionToName: 'Bitte geben Sie den Empfänger ein',
      submitWarning: '',
      amount: '',
      transferResult: null,
    });
  };

  constructAccountName = function () {
    return `${this.state.transactionFromId} [${this.state.balance.toFixed(2)} CHF]`;
  };

  render() {
    if (this.state.transferResult) {
      return (
        <Window title="Neue Überweisung">
          <p>Überweisung an {this.state.transferResult.target} war erfolgreich.</p>
          <p>Ihr neuer Kontostand beträgt {this.state.transferResult.total.toFixed(2)}</p>
          <Button onClick={this.clearSuccessfulTransaction}>Neue Überweisung</Button>
        </Window>
      );
    }
    return (
      <Window title="Neue Überweisung">
        <Form className="window-content">
          <label>
            Von
            <input type="text" value={this.constructAccountName()} disabled />
          </label>

          <label>
            Zu
            <input
              value={this.state.transactionToId}
              onChange={this.transactionToChanged}
              placeholder="Empfängeraccount"
            />
          </label>
          <p>
            <i>{this.state.transactionToName}</i>
          </p>

          <label>
            Betrag [CHF]
            <input
              type="number"
              step=".01"
              value={this.state.amount}
              onChange={this.amountChanged}
              placeholder="Betrag in CHF"
            />
          </label>

          <Button type="submit" onClick={this.submitTransaction}>
            Überweisen
          </Button>
          <label>{this.state.submitWarning}</label>
        </Form>
      </Window>
    );
  }
}

export default NewTransaction;
