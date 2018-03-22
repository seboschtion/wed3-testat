import _ from 'lodash'
import React from 'react'
import { Table } from 'semantic-ui-react'
import ComponentTitle from './ComponentTitle'
import TableFilter from './TableFilter'
import TransactionOverviewRows from './TransactionOverviewRows'
import TransactionOverviewHeader from './TransactionOverviewHeader'
import TransactionOverviewPagination from './TransactionOverviewPagination'
import * as api from "../api"

class TransactionOverview extends React.Component {
    state = {
        transactions: [],
        column: null,
        direction: null,
        count: 3,
        offset: 0,
        from: "",
        to: ""
    };

    componentDidMount() {
        api.getTransactions(this.props.token, this.state.from, this.state.to, this.state.count, this.state.offset).then(value => {
            this.setState({transactions: value.result});
        });
    }

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
                    <TableFilter name="Jahr" items={[2018,2017,2016,2015]}/>
                    <TableFilter name="Monat" items={["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]}/>
                    <Table sortable celled>
                        <TransactionOverviewHeader sortHandler={this.handleSort}/>
                        <TransactionOverviewRows transactions={this.state.transactions} />
                        <TransactionOverviewPagination/>
                    </Table>
                </div>
            </div>
        );
    }
}

export default TransactionOverview
