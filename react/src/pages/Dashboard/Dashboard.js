// @flow
import React from 'react';
import { NewTransaction, TransactionOverview, Page } from '../../components';
import * as api from '../../services/api';

type Props = {
  token: string,
};

type State = {
  transactions: Array<api.Transaction>,
};

export default class Dashboard extends React.Component<Props, State> {
  state = {
    transactions: [],
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  transactionsUpdated = () => {
    this.fetchTransactions();
  };

  fetchTransactions() {
    api.getTransactions(this.props.token).then((value) => {
      this.setState({ transactions: value.result });
    });
  }

  render() {
    return (
      <Page>
        <NewTransaction token={this.props.token} transactionCallback={this.transactionsUpdated} />
        <TransactionOverview token={this.props.token} title="Letzte Bewegungen" transactions={this.state.transactions} />
      </Page>
    );
  }
}
