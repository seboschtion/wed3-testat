import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { DatePipe } from '@angular/common';
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from '../../models/transaction';

@Component({
  selector: 'wed-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {

  private transactions: Transaction[] = [];
  public filteredTransactions: Transaction[] = [];
  @Input() maxTransactions = 1000;
  @Input() showDate = true;
  @Input() yearFilter: string;
  @Input() monthFilter: string;

  constructor(private transactionService: TransactionService, public datepipe: DatePipe) {}

  ngOnInit() {
    this.refreshTransactions();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.applyFilter();
  }

  public applyFilter() {
    if (!this.transactions) {return; }

    const yearNumber = parseInt(this.yearFilter, 10);
    const monthNumber = parseInt(this.monthFilter, 10);
    this.filteredTransactions = this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const yearMatches = !this.yearFilter || transactionDate.getFullYear() === yearNumber;
      const monthMatches = !this.monthFilter || transactionDate.getMonth() === (monthNumber - 1);
      return yearMatches && monthMatches;
    });
  }

  public prettifyDateString(dateString: string): string {
    const date = new Date(dateString);
    return this.datepipe.transform(date, 'dd.MM.yyyy');
  }

  public refreshTransactions() {
    this.transactionService.getTransactions(null, null, this.maxTransactions).subscribe((response: any) => {
        this.transactions = response.result;
        this.filteredTransactions = this.transactions;
      },
      error => {
        console.log(error);
      });
  }

}
