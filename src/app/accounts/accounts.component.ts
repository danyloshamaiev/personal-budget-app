import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, retry, Subject, takeUntil} from 'rxjs';
import {IAccount} from '../models/account.model';
import {AccountsService} from '../services/accounts.service';

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
    private router: Router
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.accounts$ = this.accountsService
      .getUserAccounts()
      .pipe(retry(1), takeUntil(this.unsubscribe$));
    this.balance$ = this.accountsService
      .getUserTotalBalance()
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
