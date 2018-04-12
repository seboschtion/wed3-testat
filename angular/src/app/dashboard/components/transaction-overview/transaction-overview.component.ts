import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction";

@Component({
  selector: 'wed-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((value: [Transaction]) => {
      console.log("transactions received");
      console.log(value);
    },
    error => {
      console.log("error");
      console.log(error);
    });
  }

}
