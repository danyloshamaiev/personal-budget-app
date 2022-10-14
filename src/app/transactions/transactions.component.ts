import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject, takeUntil} from 'rxjs';
import {ITransaction} from '../models/transaction.model';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  public transactions$: Observable<ITransaction[]>;
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.transactions$ = this.accountsService
      .getUserTransactions('test')
      .pipe(takeUntil(this.unsubscribe$));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  // public openAccount(account: string): void {
  //   this.router.navigate(['accounts', account]);
  // }

  public addTransaction(): void {
    this.router.navigate(['transactions', 'new']);
  }
}
