import React from 'react';
import { NewTransaction, TransactionOverview, Page } from '../../components';
import * as api from '../../services/api';

export default class Dashboard extends React.Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  transactionsUpdated() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    api.getTransactions(this.props.token).then((value) => {
      this.setState({ transactions: value.result });
    });
  }

  render() {
    return (
      <Page>
        <NewTransaction
          token={this.props.token}
          transactionCallback={this.transactionsUpdated.bind(this)}
        />
        <TransactionOverview
          token={this.props.token}
          title="Letzte Bewegungen"
          transactions={this.state.transactions}
        />
      </Page>
    );
  }
}
