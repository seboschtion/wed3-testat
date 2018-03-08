import React from 'react'
import { Table } from 'semantic-ui-react'

class TransactionOverview extends React.Component {
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Datum</Table.HeaderCell>
                        <Table.HeaderCell>Von</Table.HeaderCell>
                        <Table.HeaderCell>Zu</Table.HeaderCell>
                        <Table.HeaderCell>Betrag</Table.HeaderCell>
                        <Table.HeaderCell>Kontostand neu</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>8. März 2018</Table.Cell>
                        <Table.Cell>Mario</Table.Cell>
                        <Table.Cell>Sebastian</Table.Cell>
                        <Table.Cell>1'000'000 Fr.</Table.Cell>
                        <Table.Cell>2'000'000 Fr.</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}


export default TransactionOverview;
