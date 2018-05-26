// @flow
import React from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  sortHandler: any,
};

export default class TransactionOverviewHeader extends React.Component<Props> {
  render() {
    let column: null;
    let direction: null;

    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={column === 'date' ? direction : null} onClick={this.props.sortHandler('date')}>
            Datum
          </Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'from' ? direction : null} onClick={this.props.sortHandler('from')}>
            Von
          </Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'target' ? direction : null} onClick={this.props.sortHandler('target')}>
            Zu
          </Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'amount' ? direction : null} onClick={this.props.sortHandler('amount')}>
            Betrag
          </Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'total' ? direction : null} onClick={this.props.sortHandler('total')}>
            Kontostand neu
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}
