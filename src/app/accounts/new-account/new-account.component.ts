import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Subject, takeUntil} from 'rxjs';
import {AccountsService} from '../../services/accounts.service';
import {
  addAccount,
  addAccountSuccess,
} from '../../state/accounts/accounts.actions';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent implements OnInit, OnDestroy {
  public newAccountForm: FormGroup;
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private store: Store,
    private router: Router,
    private actions$: Actions
  ) {
    this.newAccountForm = new FormGroup({
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

  public addNewAccount(): void {
    this.store.dispatch(
      addAccount({
        account: {
          name: this.newAccountForm.value.name,
          balance: this.newAccountForm.value.initialBalance,
        },
      })
    );
    this.actions$.pipe(ofType(addAccountSuccess)).subscribe(() => {
      this.router.navigate(['accounts']);
    });
  }
}
