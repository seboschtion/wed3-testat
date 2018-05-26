import React from 'react';
import { Page, TransactionOverview } from '../../components';
import * as api from '../../services/api';

export default class AllTransactions extends React.Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions(from = '', to = '') {
    api.getTransactions(this.props.token, from, to, 155, 0).then((value) => {
      this.setState({ transactions: value.result });
    });
  }

  filterChanged(newFrom, newTo) {
    this.fetchTransactions(newFrom, newTo);
  }

  render() {
    return (
      <Page>
        <TransactionOverview
          className="window"
          token={this.props.token}
          title="Letzte Bewegungen"
          transactions={this.state.transactions}
          filterChangedCallback={this.filterChanged.bind(this)}
          showFilters
        />
      </Page>
    );
  }
}
