import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BoxComponent } from './box/box.component';
import {CommonModule} from "@angular/common";

const EXPORTED_DECLARATIONS = [
  // TODO: Add declarations here, if additional components/directives/... should be exported
  BoxComponent
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
  // forRoot() isn't needed here...
}
