import _ from 'lodash'
import React from 'react'
import { Table } from 'semantic-ui-react'
import ComponentTitle from './ComponentTitle'
import TableFilter from './TableFilter'
import TransactionOverviewRows from './TransactionOverviewRows'
import TransactionOverviewHeader from './TransactionOverviewHeader'
import * as api from "../api"

class TransactionOverview extends React.Component {
    componentDidMount() {
        api.getTransactions(this.props.token).then(value => {
            this.setState({transactions: value.result});
        });
    }

    state = {
        transactions: [],
        column: null,
        direction: null
    };

    handleSort = clickedColumn => () => {
        const { column, transactions, direction} = this.state;

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                transactions: _.sortBy(transactions, [clickedColumn]),
                direction: 'asc'
            });
            return;
        }

        this.setState({
            transactions: transactions.reverse(),
            direction: direction === 'asc' ? 'desc' : 'asc'
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <ComponentTitle title={this.props.title}/>
                <div className="window-content">
                    <TableFilter/>
                    <Table sortable celled>
                        <TransactionOverviewHeader sortHandler={this.handleSort}/>
                        <TransactionOverviewRows transactions={this.state.transactions} />
                    </Table>
                </div>
            </div>
        );
    }
}

export default TransactionOverview
