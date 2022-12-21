import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, retry, Subject, takeUntil} from 'rxjs';
import {IAccount} from '../models/account.model';
import {AccountsService} from '../services/accounts.service';
import {loadAccounts} from '../state/accounts/accounts.actions';
import {
  selectAccounts,
  selectTotalBalance,
} from '../state/accounts/accounts.selectors';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnDestroy {
  public accounts$: Observable<IAccount[]>;
  public balance$: Observable<number>;
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private store: Store
  ) {
    this.store.dispatch(loadAccounts());
    this.unsubscribe$ = new Subject<void>();
    this.accounts$ = this.store
      .select(selectAccounts)
      .pipe(retry(1), takeUntil(this.unsubscribe$));
    this.balance$ = this.store
      .select(selectTotalBalance)
      .pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public openAccount(account: string): void {
    this.router.navigate(['transactions', account]);
  }

  public addAccount(): void {
    this.router.navigate(['accounts', 'new']);
  }
}
