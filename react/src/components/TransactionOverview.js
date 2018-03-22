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
        column: null,
        direction: null,
    };

    handleSort = clickedColumn => () => {
        const { column, direction} = this.state;
        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                direction: 'asc'
            });
        } else {
            this.setState({
                direction: direction === 'asc' ? 'desc' : 'asc'
            });
        }
    }

    render() {
        let sortedTransactions = _.sortBy(this.props.transactions, [this.state.column]);
        if(this.state.direction === "desc") {
            sortedTransactions.reverse();
        }
        return (
            <div className={this.props.className}>
                <ComponentTitle title={this.props.title}/>
                <div className="window-content">
                    <TableFilter name="Jahr" items={[2018,2017,2016,2015]}/>
                    <TableFilter name="Monat" items={["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]}/>
                    <Table sortable celled>
                        <TransactionOverviewHeader sortHandler={this.handleSort}/>
                        <TransactionOverviewRows transactions={sortedTransactions} />
                        <TransactionOverviewPagination/>
                    </Table>
                </div>
            </div>
        );
    }
}

export default TransactionOverview
