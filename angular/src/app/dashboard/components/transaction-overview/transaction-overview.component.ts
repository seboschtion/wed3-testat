import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'wed-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {

  private transactions: Transaction[] = [];
  public filteredTransactions: Transaction[] = [];
  @Input() maxTransactions: number = 1000;
  @Input() yearFilter: number;
  @Input() monthFilter: number;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransactions(null, null, this.maxTransactions).subscribe((response: any) => {
       this.transactions = response.result;
       this.filteredTransactions = this.transactions;
    },
    error => {
      console.log(error);
    });
  }

  ngOnChanges(changes: SimpleChanges){
    this.applyFilter();
  }

  applyFilter() {
    if(!this.transactions){return;}

    this.filteredTransactions = this.transactions.filter((transaction, index) => {
      const date = new Date(transaction.date);
      let yearMatches = true;

      if(this.yearFilter){
        yearMatches = date.getFullYear() == this.yearFilter
      }

      let monthMatches = true;
      if(this.monthFilter){
        monthMatches = date.getMonth() == (this.monthFilter-1);
      }
      return yearMatches && monthMatches;
    });
  }

}
