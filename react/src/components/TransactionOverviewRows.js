import React from 'react'
import { Table } from 'semantic-ui-react'

function TransactionOverviewRows({ transactions }) {
    const renderRow = function ({from, target, amount, total, date}) {
        return (
            <Table.Row>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{from}</Table.Cell>
                <Table.Cell>{target}</Table.Cell>
                <Table.Cell>{amount.toFixed(2)}</Table.Cell>
                <Table.Cell>{total.toFixed(2)}</Table.Cell>
            </Table.Row>
        );
    };

    return (
        <Table.Body>
            {transactions.map(renderRow)}
        </Table.Body>
    );
}

export default TransactionOverviewRows;
