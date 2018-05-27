// @flow
import React from 'react';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { Table } from 'semantic-ui-react';
import type Transaction from '../../services/api';
import { Window } from '../index';
import TableFilter from './TableFilter';
import TransactionOverviewRows from './TransactionOverviewRows';
import TransactionOverviewHeader from './TransactionOverviewHeader';

type Props = {
  filterChangedCallback: any,
  showFilters: boolean,
  transactions: Array<Transaction>,
  title: string,
  showDate: boolean
};

type State = {
  from: Moment,
  to: Moment,
  monthWasSet: boolean,
};

class TransactionOverview extends React.Component<Props, State> {
  static getYearFilters() {
    const today = new Date();
    const currentYear = today.getFullYear();
    return [
      { text: `${currentYear}`, value: currentYear, key: currentYear },
      { text: `${currentYear-1}`, value: currentYear-1, key: currentYear-1 },
      { text: `${currentYear-2}`, value: currentYear-2, key: currentYear-2 }
      ];
  }

  static getMonthFilters() {
    return [
      { text: 'Januar', value: 1, key: 1 },
      { text: 'Februar', value: 2, key: 2 },
      { text: 'März', value: 3, key: 3 },
      { text: 'April', value: 4, key: 4 },
      { text: 'Mai', value: 5, key: 5 },
      { text: 'Juni', value: 6, key: 6 },
      { text: 'Juli', value: 7, key: 7 },
      { text: 'August', value: 8, key: 8 },
      { text: 'September', value: 9, key: 9 },
      { text: 'Oktober', value: 10, key: 10 },
      { text: 'November', value: 11, key: 11 },
      { text: 'Dezember', value: 12, key: 12 },
    ];
  }

  state = {
    column: null,
    direction: null,
  };

  filter = {
    from: moment('1970-01-01'),
    to: moment(),
    monthWasSet: false,
  };

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'asc',
      });
    } else {
      this.setState({
        direction: direction === 'asc' ? 'desc' : 'asc',
      });
    }
  };

  filterChanged = (newValue) => {
    if (newValue > 12) {
      this.filter.from.year(newValue);
      this.filter.to.year(newValue);
      if (!this.filter.monthWasSet) {
        this.filter.from.month(0);
        this.filter.to.month(11);
      }
    } else {
      this.filter.from.month(newValue - 1);
      this.filter.to.month(newValue);
      this.filter.from.year(this.filter.to.year());
      this.filter.to.year(this.filter.to.year());
      this.filter.monthWasSet = true;
    }

    this.filter.from.date(1);
    this.filter.to.date(1);

    const format = 'YYYY-MM-D';
    this.props.filterChangedCallback(this.filter.from.format(format), this.filter.to.format(format));
  };

  hideFilters() {
    return this.props.showFilters ? '' : 'hide';
  }

  render() {
    const sortedTransactions = _.sortBy(this.props.transactions, [this.state.column]);
    if (this.state.direction === 'desc') {
      sortedTransactions.reverse();
    }

    return (
      <Window title={this.props.title}>
        <TableFilter
          name="Jahr"
          items={TransactionOverview.getYearFilters()}
          filterChangedCallback={this.filterChanged}
          className={this.hideFilters()}
        />
        <TableFilter
          name="Monat"
          items={TransactionOverview.getMonthFilters()}
          filterChangedCallback={this.filterChanged}
          className={this.hideFilters()}
        />
        <Table sortable celled>
          <TransactionOverviewHeader showDate={this.props.showDate} sortHandler={this.handleSort} />
          <TransactionOverviewRows showDate={this.props.showDate} transactions={sortedTransactions} />
        </Table>
      </Window>
    );
  }
}

export default TransactionOverview;
