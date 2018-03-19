import React from "react";
import NewTransaction from "./NewTransaction";
import TransactionOverview from "./TransactionOverview";

function Dashboard(props) {
    return (
        <div className="site-content">
            <NewTransaction className="window window-left" token={props.token} />

            <TransactionOverview className="window" token={props.token} title="Letzte Bewegungen"/>
        </div>
    )
}

export default Dashboard;
