import React from "react";
import { Button, Form } from "semantic-ui-react"
import ComponentTitle from "./ComponentTitle"
import * as api from "../api"

class NewTransaction extends React.Component {

    componentDidMount() {
        api.getAccountDetails(this.props.token).then(value => {
            this.setState({
                transactionFromId:value.accountNr,
                balance: value.amount
            });
        });
    }

    state = {
        transactionFromId: 0,
        balance: 0,
        transactionToId: "",
        transactionToName: "Bitte geben Sie den Empfänger ein",
        amount: "",
        transferResult: null
    };

    submitTransaction = (event) => {
        event.preventDefault();
        api.transfer(this.state.transactionToId, this.state.amount, this.props.token).then(transferResult => {
            this.setState({
                transferResult:transferResult,
                balance: transferResult.total
            });
        });
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

    clearSuccessfulTransaction = (event) => {
        this.setState({
            transactionToId: "",
            transactionToName: "Bitte geben Sie den Empfänger ein",
            amount: "",
            transferResult: null
        });
    };

    constructAccountName= function() {
        return this.state.transactionFromId + " [" + this.state.balance.toFixed(2) + " CHF]";
    };

    render() {

        if(this.state.transferResult) {
            return (
                <div>
                    <ComponentTitle title="Neue Bewegung" />
                    <p>Überweisung an {this.state.transferResult.target} war erfolgreich.</p>
                    <p>Ihr neuer Kontostand beträgt {this.state.transferResult.total.toFixed(2)}</p>
                    <Button onClick={this.clearSuccessfulTransaction}>Neue Überweisung</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <ComponentTitle title="Neue Bewegung" />
                    <Form>
                        <p>Von</p>
                        <input type="text" value={this.constructAccountName()} disabled />

                        <p>Zu</p>
                        <input value={this.state.transactionToId}
                               onChange={this.transactionToChanged}
                               placeholder="Empfängeraccount"/>
                        <label>{this.state.transactionToName}</label>

                        <p>Betrag [CHF]</p>
                        <input type="number" step=".01" value={this.state.amount}
                               onChange={this.amountChanged}
                               placeholder="Betrag in CHF"/>


                        <Button type="submit" onClick={this.submitTransaction}>Überweisen</Button>
                    </Form>
                </div>
            );
        }
    }
}

export default NewTransaction