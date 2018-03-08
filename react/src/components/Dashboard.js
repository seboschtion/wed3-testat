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
                <TransactionOverview />
            </div>
        </div>
    )
}

export default Dashboard;
