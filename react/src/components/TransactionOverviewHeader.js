import React from 'react'
import { Table } from 'semantic-ui-react'

function TransactionOverviewHeader() {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Datum</Table.HeaderCell>
                <Table.HeaderCell>Von</Table.HeaderCell>
                <Table.HeaderCell>Zu</Table.HeaderCell>
                <Table.HeaderCell>Betrag</Table.HeaderCell>
                <Table.HeaderCell>Kontostand neu</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
   );
}

export default TransactionOverviewHeader;
