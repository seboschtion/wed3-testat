import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionOverviewComponent} from "../transaction-overview/transaction-overview.component";

@Component({
  selector: 'wed-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @ViewChild(TransactionOverviewComponent) private transactionOverview: TransactionOverviewComponent;
  public refreshTransactions() {
    if(this.transactionOverview) {
      this.transactionOverview.refreshTransactions();
    }
  }

}
