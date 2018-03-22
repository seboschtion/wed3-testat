import _ from 'lodash'
import React from 'react'
import { Table } from 'semantic-ui-react'
import ComponentTitle from './ComponentTitle'
import TableFilter from './TableFilter'
import TransactionOverviewRows from './TransactionOverviewRows'
import TransactionOverviewHeader from './TransactionOverviewHeader'
import moment from 'moment'

class TransactionOverview extends React.Component {
    state = {
        column: null,
        direction: null
    };

    filter = {
        from: moment("1970-01-01"),
        to: moment()
    }

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

    getYearFilters() {
        return [
            { text: "2018", value: 2018, key: 2018},
            { text: "2017", value: 2017, key: 2017},
            { text: "2016", value: 2016, key: 2016},
            { text: "2015", value: 2015, key: 2015},
        ];
    }

    getMonthFilters() {
        return [
            { text: "Januar", value: 1, key: 1},
            { text: "Februar", value: 2, key: 2},
            { text: "März", value: 3, key: 3},
            { text: "April", value: 4, key: 4},
            { text: "Mai", value: 5, key: 5},
            { text: "Juni", value: 6, key: 6},
            { text: "Juli", value: 7, key: 7},
            { text: "August", value: 8, key: 8},
            { text: "September", value: 9, key: 9},
            { text: "Oktober", value: 10, key: 10},
            { text: "November", value: 11, key: 11},
            { text: "Dezember", value: 12, key: 12},
        ];
    }

    filterChanged = (newValue) => {
        if(newValue > 12) {
            this.filter.from.set("year", newValue);
            this.filter.to.set("year", newValue);
        } else {
            this.filter.from.set("month", newValue);
            this.filter.to.set("month", newValue + 1);
        }
        this.filter.to.set("day", 1);
        this.props.filterChangedCallback(this.filter.from.format(), this.filter.to.format());
    }

    hideFilters() {
        return this.props.showFilters ? "" : "hide";
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
                    <TableFilter name="Jahr" items={this.getYearFilters()} filterChangedCallback={this.filterChanged.bind(this)} className={this.hideFilters()}/>
                    <TableFilter name="Monat" items={this.getMonthFilters()} filterChangedCallback={this.filterChanged.bind(this)} className={this.hideFilters()}/>
                    <Table sortable celled>
                        <TransactionOverviewHeader sortHandler={this.handleSort}/>
                        <TransactionOverviewRows transactions={sortedTransactions} />
                    </Table>
                </div>
            </div>
        );
    }
}

export default TransactionOverview
