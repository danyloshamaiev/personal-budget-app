import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {IAccount} from '../models/account.model';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit, OnDestroy {
  public accounts!: IAccount[];
  public balance: number;
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.balance = 0;
  }

  ngOnInit(): void {
    this.accountsService
      .getUserAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts: IAccount[] | null) => {
        if (!!accounts) this.accounts = accounts;
      });
    this.accountsService
      .getUserTotalBalance()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((balance: number | null) => {
        if (!!balance) this.balance = balance;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public openAccount(account: string): void {
    this.router.navigate(['accounts', account]);
  }

  public addAccount(): void {
    this.router.navigate(['accounts', 'new']);
  }
}
