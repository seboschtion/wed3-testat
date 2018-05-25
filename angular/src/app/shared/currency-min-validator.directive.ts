import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[customMin]',
  providers: [{provide: NG_VALIDATORS, useExisting: CurrencyMinDirective, multi: true}]
})

export class CurrencyMinDirective implements Validator {
  @Input()
  customMin: number;

  validate(c: FormControl): {[key: string]: any} {
    const amount = c.value;
    return ( amount < this.customMin) ? {'customMin': true} : null;
  }
}
