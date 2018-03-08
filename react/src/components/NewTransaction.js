import React from "react";
import { Button, Form } from "semantic-ui-react"
import ComponentTitle from "./ComponentTitle"
import * as api from "../api"

class NewTransaction extends React.Component {

    state = {
        transactionFromId: 0,
        transactionToId: "",
        amount: 0.0
    };

    submitTransaction = (event) => {
        event.preventDefault();
        api.transfer(this.state.transactionToId, this.state.amount);
    };

    transactionFromChanged = (event) => {
        this.setState({transactionFromId:event.target.value});
    };

    transactionToChanged = (event) => {
        this.setState({transactionToId:event.target.value});
    };

    amountChanged = (event) => {
        this.setState({amount:event.target.value});
    };

    render() {
        return (
            <div>
                <ComponentTitle title="Neue Bewegung" />
                <Form>
                    <p>Von</p>
                    <select value={this.state.transactionToId} onChange={this.transactionFromChanged}>
                        <option>Todo</option>
                    </select>

                    <p>Zu</p>
                    <input value={this.state.transactionToId} onChange={this.transactionToChanged}/>

                    <input type="number" step=".01" value={this.state.amount} onChange={this.amountChanged}/>
                    <p>CHF</p>

                    <Button type="submit" onClick={this.submitTransaction}>Überweisen</Button>
                </Form>
            </div>
        );
    }
}

export default NewTransaction