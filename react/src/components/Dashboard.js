import React from "react";
import NewTransaction from "./NewTransaction";
import TransactionOverview from "./TransactionOverview";
import * as api from "../api";

class Dashboard extends React.Component {

    state = {
        transactions: []
    };

    componentDidMount() {
        this.fetchTransactions();
    }

    transactionsUpdated(){
        this.fetchTransactions();
    }

    fetchTransactions(){
        api.getTransactions(this.props.token).then(value => {
            this.setState({transactions: value.result});
        });
    }


    render() {
        return (
            <div className="site-content">
                <NewTransaction className="window window-left" token={this.props.token} transactionCallback={this.transactionsUpdated.bind(this)}/>
                <TransactionOverview className="window" token={this.props.token} title="Letzte Bewegungen" transactions={this.state.transactions}/>
            </div>
        );
    }
}


export default Dashboard;
