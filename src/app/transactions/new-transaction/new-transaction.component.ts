import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {AccountsService} from '../../services/accounts.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent implements OnInit, OnDestroy {
  public newTransactionForm: FormGroup;
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) {
    this.newTransactionForm = new FormGroup({
      name: new FormControl(''),
      initialBalance: new FormControl<number | null>(null),
    });
    this.unsubscribe$ = new Subject<void>();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public addNewTransaction(): void {
    this.accountsService
      .addUserAccount(
        this.newTransactionForm.value.name,
        this.newTransactionForm.value.initialBalance
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['accounts']);
      });
  }
}
