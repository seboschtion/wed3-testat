import React from 'react'
import TransactionOverview from "./TransactionOverview";
import * as api from "../api";

class AllTransactions extends React.Component {

    state = {
        transactions: [],
        count: 155,
        offset: 0,
        from: "",
        to: ""
    };

    componentDidMount() {
        this.fetchTransactions();
    }

    fetchTransactions() {
        api.getTransactions(this.props.token, this.state.from, this.state.to, this.state.count, this.state.offset).then(value => {
            this.setState({transactions: value.result});
        });
    }

    filterChanged(newFrom, newTo) {
        console.log("newFrom: " + newFrom);
        console.log("newTo: " + newTo);
        this.setState({from: newFrom, to: newTo});
    }

    render() {
        return (
            <div className="site-content">
                <TransactionOverview className="window" token={this.props.token} title="Letzte Bewegungen" transactions={this.state.transactions} filterChangedCallback={this.filterChanged.bind(this)} showFilters/>
            </div>
        );
    }
}

export default AllTransactions;
