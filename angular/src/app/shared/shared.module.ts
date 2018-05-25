import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, NG_VALIDATORS} from '@angular/forms';
import {BoxComponent} from './box/box.component';
import {CommonModule} from '@angular/common';
import {CurrencyMinDirective} from './currency-min-validator.directive';
import {CoreModule} from '../core/core.module';
import {NavigationService} from '../core/services';

const EXPORTED_DECLARATIONS = [
  // TODO: Add declarations here, if additional components/directives/... should be exported
  BoxComponent, CurrencyMinDirective
];
const INTERNAL_DECLARATIONS = [
  ...EXPORTED_DECLARATIONS
  // Declarations (Components / Directives) which can be used inside the Module
];
const EXPORTS = [
  ...EXPORTED_DECLARATIONS,
  // TODO: Add exports here, if additional modules should be exported
  CommonModule, FormsModule
];

@NgModule({
  declarations: INTERNAL_DECLARATIONS,
  imports: [
    FormsModule
  ],
  exports: EXPORTS,
  providers: []
})
export class SharedModule {
  static forRoot(config?: {}): ModuleWithProviders {

    return {
      ngModule: SharedModule,
        providers: [{provide: NG_VALIDATORS, useExisting: CurrencyMinDirective, multi: true}]
    };
  }
}
