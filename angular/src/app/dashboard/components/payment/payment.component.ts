import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BankAccountService} from '../../services';
import {BankAccount} from '../../models/bankaccount';
import {NgForm} from '@angular/forms';
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from '../../models/transaction';

@Component({
  selector: 'wed-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private bankAccountService: BankAccountService, private transactionService: TransactionService) {
  }

  private NO_ACC = 'Account existiert nicht';

  @Output() refreshTransactions = new EventEmitter<void>();

  public bankAccount: BankAccount;
  private transactionSubmitted = false;
  public target: string;
  public targetBankAccountOwner: string;
  public minNum = 0.05;
  public amount: number;
  public errorMessage = '';


  ngOnInit() {
    const bankAccount = this.bankAccountService.getCurrentBankAccount().subscribe(value =>
      this.bankAccount = value
    );
  }

  public doPayment(f: NgForm): boolean {
    if (this.targetBankAccountOwner === this.NO_ACC) {
      this.errorMessage = "Geben Sie einen gültigen Empfänger ein.";
      return;
    }
    if (this.target === this.bankAccount.accountNr) {
      this.errorMessage = "Sie können kein Geld an sich selbst überweisen.";
      return;
    }
    this.errorMessage = '';

    if (f && f.valid) {
      this.transactionService.submitTransaction(f.form.value.target, f.form.value.amount).subscribe(reponse => {
          if (!reponse) { return; }
          this.transactionSubmitted = true;
          this.bankAccount.amount = reponse.total;
          this.refreshTransactions.emit();
        }
      );
    }
    return false;
  }

  public searchBankaccount() {
    this.errorMessage = '';
    if (!this.target) { return; }
    this.bankAccountService.getSpecificBankAccount(this.target).subscribe(bankAccount => {
      if (bankAccount) {
        this.targetBankAccountOwner = bankAccount.owner.firstname + " " + bankAccount.owner.lastname;
      } else {
        this.targetBankAccountOwner = this.NO_ACC;
      }
    });
  }

  public resetForNewTransaction() {
    this.transactionSubmitted = false;
    this.target = null;
    this.targetBankAccountOwner = null;
    this.amount = 0;
  }
}
