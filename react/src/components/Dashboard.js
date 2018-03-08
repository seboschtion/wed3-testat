import React from "react";
import NewTransaction from "./NewTransaction";
import TransactionOverview from "./TransactionOverview";

function Dashboard(props) {
    return (
        <div>
            <div>
                <NewTransaction/>
            </div>

            <div>
                <TransactionOverview title="Letzte Bewegungen" />
            </div>
        </div>
    )
}

export default Dashboard;
