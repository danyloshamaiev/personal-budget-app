import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subject, takeUntil} from 'rxjs';
import {IAccount} from '../../models/account.model';
import {AccountsService} from '../../services/accounts.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent implements OnInit, OnDestroy {
  public newTransactionForm: FormGroup;
  public accounts$: Observable<IAccount[]>;
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) {
    this.newTransactionForm = new FormGroup({
      account: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl<Date>(new Date()),
      notes: new FormControl(''),
      sum: new FormControl<number>(0),
    });
    this.accounts$ = this.accountsService.getUserAccounts();
    this.unsubscribe$ = new Subject<void>();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public addNewTransaction(): void {
    this.accountsService
      .addUserTransaction({
        ...this.newTransactionForm.value,
        sum: +this.newTransactionForm.value.sum,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['accounts']);
      });
  }
}
