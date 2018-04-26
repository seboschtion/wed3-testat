import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AuthModule} from '../auth/auth.module';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {OverviewComponent} from './components/overview/overview.component';
import {BankAccountService} from "./services";
import {TransactionService} from "./services/transaction.service";
import {TransactionOverviewComponent} from "./components/transaction-overview/transaction-overview.component";

const EXPORTED_DECLARATIONS = [
  // Declarations (Components / Directives) which can be used outside the Module
  DashboardComponent, OverviewComponent, TransactionsComponent, TransactionOverviewComponent
];
const INTERNAL_DECLARATIONS = [
  ...EXPORTED_DECLARATIONS,
  // Declarations (Components / Directives) which can be used inside the Module
];
const EXPORTS = [
  ...EXPORTED_DECLARATIONS
  // Components/Directives (or even Modules) to export (available for other modules; and forRoot() )
];

@NgModule({
  declarations: INTERNAL_DECLARATIONS,
  imports: [
    // Other Modules to import (imports the exported Components/Directives from the other module)
    SharedModule, AuthModule, DashboardRoutingModule
  ],
  exports: EXPORTS,
  providers: [
    // DI Providers (hierarchical)
    // (Services, Tokens, Factories, ...) used from/within this Module; add either here or in forRoot();
    //  * Registers these Classes for the current Module; importing Modules will create new instances (for importing level and below)
    BankAccountService,
    TransactionService
  ]
})
export class DashboardModule {
  static forRoot(config?: {}): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [
      ]
    };
  }

}
