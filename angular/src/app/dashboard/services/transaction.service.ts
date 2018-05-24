import {Injectable} from '@angular/core';
import {ResourceBase} from '../../core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BankAccount} from '../models/bankaccount';
import {Transaction} from '../models/transaction';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TransactionService extends ResourceBase {

  constructor(http: HttpClient) {
    super(http);
  }

  public submitTransaction(target: string, amount: number): Observable<Transaction> {
    return this.post('/accounts/transactions', {target, amount}).pipe(
      map((result: any) => {
        if (result) {
          return Transaction.fromDto(result);
        }
        return null;
      }),
      catchError((error: any) => of<Transaction>(null))
    );
  }

  public getTransactions(dateFrom: Date = null, dateTo: Date = null, count: number = 1000): Observable<any> {
    if (!dateFrom) {
      dateFrom = new Date('1968-11-16T00:00:00');
    }

    if (!dateTo) {
      dateTo = new Date();
    }

    return this.get(`/accounts/transactions?fromDate=${dateFrom}&toDate=${dateTo}&count=${count}`);
  }

}
