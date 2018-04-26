import {Component, OnInit} from '@angular/core';
import {BankAccountService} from '../../services';
import {BankAccount} from '../../models/bankaccount';

@Component({
  selector: 'wed-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private bankAccountService: BankAccountService) {
  }

  public bankAccount: BankAccount;

  ngOnInit() {
    const bankAccount = this.bankAccountService.getCurrentBankAccount().subscribe(value =>
      this.bankAccount = value
    );
    console.log('bankAccount:');
    console.log(bankAccount);
  }

}
