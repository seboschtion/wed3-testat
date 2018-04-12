import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/services";
import {BankAccountService} from "../../services";

@Component({
  selector: 'wed-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {

  constructor(private bankAccountService: BankAccountService) { }

  ngOnInit() {

  }

}
