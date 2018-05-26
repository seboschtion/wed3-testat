import React from 'react';
import { NewTransaction, TransactionOverview, Page } from '../../components';
import * as api from '../../services/api';

class Dashboard extends React.Component {
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
          className="window window-left"
          token={this.props.token}
          transactionCallback={this.transactionsUpdated.bind(this)}
        />
        <TransactionOverview
          className="window"
          token={this.props.token}
          title="Letzte Bewegungen"
          transactions={this.state.transactions}
        />
      </Page>
    );
  }
}

export default Dashboard;
