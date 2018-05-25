import {Component, OnInit} from '@angular/core';
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

  public bankAccount: BankAccount;
  private transaction: Transaction;
  public target: string;
  public targetBankAccountOwner: string;
  public minNum = 0.05;

  ngOnInit() {
    const bankAccount = this.bankAccountService.getCurrentBankAccount().subscribe(value =>
      this.bankAccount = value
    );
  }

  public doPayment(f: NgForm): boolean {
    if (f && f.valid) {
      this.transactionService.submitTransaction(f.form.value.target, f.form.value.amount).subscribe(value => {
          console.log(value); // TODO: remove log
          if (!value) {
            return false;
          }
            // TODO: display current transaction
            this.transaction = value;
            return true;
        }
      );
    }
    return false;
  }
  public searchBankaccount() {
    this.bankAccountService.getSpecificBankAccount(this.target).subscribe(bankAccount => {
      if (bankAccount) {
        this.targetBankAccountOwner = bankAccount.owner.firstname + bankAccount.owner.lastname;
      } else {
        this.targetBankAccountOwner = '';
      }
      console.log(this.targetBankAccountOwner);
    });

  }
}
