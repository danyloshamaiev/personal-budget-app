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
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.accountsService
      .getUserAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts: IAccount[] | null) => {
        if (!!accounts) this.accounts = accounts;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public openAccount(account: string) {
    this.router.navigate([account]);
  }
}
