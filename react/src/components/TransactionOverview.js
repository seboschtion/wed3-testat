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
        transactions: []
    };

    render() {
        return (
            <div>
                <ComponentTitle title={this.props.title}/>
                <TableFilter/>
                <Table celled>
                    <TransactionOverviewHeader />
                    <TransactionOverviewRows transactions={this.state.transactions} />
                </Table>
            </div>
        );
    }
}


export default TransactionOverview
