import React from "react";
import { Button, Form } from "semantic-ui-react"
import ComponentTitle from "./ComponentTitle"
import * as api from "../api"

class NewTransaction extends React.Component {

    componentDidMount() {
        api.getAccountDetails(this.props.token).then(value => {
            this.setState({transactionFromId:value.accountNr});
        });
    }

    state = {
        transactionFromId: 0,
        transactionToId: "",
        transactionToName: "",
        amount: 0.0
    };

    submitTransaction = (event) => {
        event.preventDefault();
        api.transfer(this.state.transactionToId, this.state.amount, this.props.token);
    };

    transactionToChanged = (event) => {
        this.setState({transactionToId:event.target.value});
        api.getAccount(event.target.value, this.props.token).then(value => {
            this.setState({transactionToName:value.owner.firstname + " " + value.owner.lastname});
        }).catch(reason => {
            this.setState({transactionToName:"Unbekannt"});
        });
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
                    <input type="text" value={this.state.transactionFromId} disabled />

                    <p>Zu</p>
                    <input value={this.state.transactionToId} onChange={this.transactionToChanged}/>
                    <label>{this.state.transactionToName}</label>

                    <input type="number" step=".01" value={this.state.amount} onChange={this.amountChanged}/>
                    <p>CHF</p>

                    <Button type="submit" onClick={this.submitTransaction}>Überweisen</Button>
                </Form>
            </div>
        );
    }
}

export default NewTransaction