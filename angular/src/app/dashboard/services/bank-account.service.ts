import {Injectable} from '@angular/core';
import {ResourceBase} from '../../core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';
import {Account} from '../../auth/models';
import {BankAccount} from '../models/bankaccount';
import {of} from 'rxjs/observable/of';

@Injectable()
export class BankAccountService extends ResourceBase {

  constructor(http: HttpClient) {
    super(http);
  }

  public getCurrentBankAccount(): Observable<BankAccount> {
    return this.get('/accounts')
      .pipe(
        map((result: any) => {
          if (result) {
            return BankAccount.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<BankAccount>(null))
      );
  }

  public getSpecificBankAccount(accountNr: string): Observable<BankAccount> {
    if (!accountNr) {
      return null;
    }
    return this.get(`/accounts/${accountNr}`)
      .pipe(
        map((result: any) => {
          if (result) {
            return BankAccount.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<BankAccount>(null))
      );
  }

}
