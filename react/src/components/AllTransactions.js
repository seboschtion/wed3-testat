import React from 'react'
import TransactionOverview from "./TransactionOverview";

function AllTransactions(props) {
    return (
        <div className="site-content">
            <TransactionOverview className="window" token={props.token} title="Letzte Bewegungen"/>
        </div>
    )
}

export default AllTransactions;
