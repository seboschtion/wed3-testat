// @flow
import React from 'react';
import moment from 'moment';
import { Table } from 'semantic-ui-react';
import type { Transaction } from '../../services/api';

type Props = {
  transactions: Array<Transaction>,
  showDate: boolean,
};

export default class TransactionOverviewRows extends React.Component<Props> {
  renderRow = (transaction: Transaction) => (
    <Table.Row key={transaction.date}>
      {this.props.showDate ? <Table.Cell>{moment(transaction.date).format('DD.MM.YYYY')}</Table.Cell> : ''}
      <Table.Cell>{transaction.from}</Table.Cell>
      <Table.Cell>{transaction.target}</Table.Cell>
      <Table.Cell>{transaction.amount.toFixed(2)}</Table.Cell>
      <Table.Cell>{transaction.total.toFixed(2)}</Table.Cell>
    </Table.Row>
  );

  render() {
    return <Table.Body>{this.props.transactions.map(this.renderRow)}</Table.Body>;
  }
}
