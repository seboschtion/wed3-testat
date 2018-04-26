import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../models/transaction";

@Component({
  selector: 'wed-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {

  private transactions: Transaction[];
  public filteredTransactions: Transaction[];
  @Input() maxTransactions: number = 1000;
  @Input() yearFilter: number;
  @Input() monthFilter: number;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransactions(null, null, this.maxTransactions).subscribe((value: Transaction[]) => {
        this.transactions = value;
        this.filteredTransactions = this.transactions;

        //TODO REMOVE MOCK
        const x = new Transaction("1", "3", 100.0, 900, new Date());
        const d = new Date();
        d.setFullYear(2017);
        const y = new Transaction("2", "4", 100.0, 900, d);
        this.transactions = [x, y];
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
      let yearMatches = true;
      if(this.yearFilter){
        yearMatches = transaction.date.getFullYear() == this.yearFilter
      }

      let monthMatches = true;
      if(this.monthFilter){
        monthMatches = transaction.date.getMonth() == (this.monthFilter-1);
      }
      return yearMatches && monthMatches;
    });
  }

}
