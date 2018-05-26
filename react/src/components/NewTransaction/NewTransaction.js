// @flow
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Window, Input } from '../index';
import * as api from '../../services/api';

type Props = {
  token: string,
  transactionCallback: any,
};

type State = {
  transactionFromId: number,
  balance: number,
  transactionToId: string,
  transactionToName: string,
  submitWarning: string,
  amount: string,
  transferResult: any,
};

export default class NewTransaction extends React.Component<Props, State> {
  state = {
    transactionFromId: 0,
    balance: 0,
    transactionToId: '',
    transactionToName: 'Bitte geben Sie den Empfänger ein',
    submitWarning: '',
    amount: '',
    transferResult: null,
  };

  componentDidMount() {
    api.getAccountDetails(this.props.token).then((value) => {
      this.setState({
        transactionFromId: value.accountNr,
        balance: value.amount,
      });
    });
  }

  submitTransaction = (event) => {
    event.preventDefault();

    if (this.state.balance < this.state.amount) {
      this.setState({
        submitWarning: 'Der Betrag ist grösser als der momentane Kontostand.',
      });
      return;
    }

    api.transfer(this.state.transactionToId, this.state.amount, this.props.token).then((transferResult) => {
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
      .catch(() => {
        this.setState({ transactionToName: 'Unbekannt' });
      });
  };

  amountChanged = (event) => {
    this.setState({
      amount: event.target.value,
      submitWarning: '',
    });
  };

  clearSuccessfulTransaction = () => {
    this.setState({
      transactionToId: '',
      transactionToName: 'Bitte geben Sie den Empfänger ein',
      submitWarning: '',
      amount: '',
      transferResult: null,
    });
  };

  constructAccountName = () => `${this.state.transactionFromId} [${this.state.balance.toFixed(2)} CHF]`;

  render() {
    if (this.state.transferResult) {
      return (
        <Window left title="Neue Überweisung">
          <p>Überweisung an {this.state.transferResult.target} war erfolgreich.</p>
          <p>Ihr neuer Kontostand beträgt {this.state.transferResult.total.toFixed(2)}</p>
          <Button onClick={this.clearSuccessfulTransaction}>Neue Überweisung</Button>
        </Window>
      );
    }
    return (
      <Window left title="Neue Überweisung">
        <Form className="window-content">
          <Input label="Von" value={this.constructAccountName()} disabled />
          <Input label="Zu" value={this.state.transactionToId} onChange={this.transactionToChanged} />
          <p>
            <i>{this.state.transactionToName}</i>
          </p>

          <Input type="number" step=".01" label="Betrag [CHF]" value={this.state.amount} onChange={this.amountChanged} />

          <Button type="submit" onClick={this.submitTransaction}>
            Überweisen
          </Button>
          <p className="error">{this.state.submitWarning}</p>
        </Form>
      </Window>
    );
  }
}
