import React from 'react'
import TransactionOverview from "./TransactionOverview";
import * as api from "../api";

class AllTransactions extends React.Component {

    state = {
        transactions: [],
        offset: 0,
        from: "",
        to: ""
    };

    componentDidMount() {
        this.fetchTransactions();
    }

    fetchTransactions(){
        api.getTransactions(this.props.token, this.state.from, this.state.to, this.state.count, this.state.offset).then(value => {
            this.setState({transactions: value.result});
        });
    }

    render() {
        return (
            <div className="site-content">
                <TransactionOverview className="window" token={this.props.token} title="Letzte Bewegungen" transactions={this.state.transactions} />
            </div>
        );
    }
}


export default AllTransactions;
