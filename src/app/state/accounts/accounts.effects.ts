import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, mergeMap, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountsService} from '../../services/accounts.service';
import {
  addAccount,
  addAccountSuccess,
  loadAccounts,
  loadAccountsSuccess,
} from './accounts.actions';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountsService: AccountsService
  ) {}

  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAccounts.type),
      mergeMap(() =>
        this.accountsService.getUserAccounts().pipe(
          map((accounts) => ({
            type: loadAccountsSuccess.type,
            payload: {accounts},
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAccount.type),
      mergeMap(({account}) => {
        return (
          this.accountsService
            // @ts-ignore
            .addUserAccount(account.name, +account.initialBalance)
            .pipe(
              map(() => ({
                type: addAccountSuccess.type,
              })),
              catchError(() => EMPTY)
            )
        );
      })
    )
  );
}
