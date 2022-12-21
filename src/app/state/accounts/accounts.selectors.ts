import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AccountsState} from './accounts.reducers';

export const selectAccountsState =
  createFeatureSelector<AccountsState>('accounts');

export const selectAccounts = createSelector(
  selectAccountsState,
  (state) => state.accounts
);

export const selectTotalBalance = createSelector(selectAccountsState, (state) =>
  state.accounts.reduce(
    (prevValue, curValue) => prevValue + curValue.balance,
    0
  )
);
