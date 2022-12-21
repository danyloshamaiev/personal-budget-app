import {ActionReducerMap} from '@ngrx/store';
import {accountsReducer, AccountsState} from './accounts/accounts.reducers';

export interface AppState {
  accounts: AccountsState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  accounts: accountsReducer,
};
