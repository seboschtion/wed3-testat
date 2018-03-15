import React from 'react'
import { Table } from 'semantic-ui-react'

function TransactionOverviewHeader({sortHandler}) {
    let column: null;
    let direction: null;

    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell sorted={column === 'date' ? direction : null} onClick={sortHandler('date')}>Datum</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'from' ? direction : null} onClick={sortHandler('from')}>Von</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'target' ? direction : null} onClick={sortHandler('target')}>Zu</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'amount' ? direction : null} onClick={sortHandler('amount')}>Betrag</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'total' ? direction : null} onClick={sortHandler('total')}>Kontostand neu</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
   );
}

export default TransactionOverviewHeader;
