import React from "react";
import Button from "semantic-ui-react"

class NewTransaction extends React.Component {

    render() {
        return (
            <div>
                <p>Von</p>
                <select>
                    <option>Todo</option>
                </select>

                <p>Zu</p>
                <select>
                    <option>Todo</option>
                </select>

                <input type="number" step=".01"/>
                <p>CHF</p>

                <Button>Überweisen</Button>
                <Button>Überweisen</Button>
            </div>
        );
    }
}

export default NewTransaction