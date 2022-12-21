import {createReducer, on} from '@ngrx/store';
import {IAccount} from '../../models/account.model';
import {loadAccountsSuccess} from './accounts.actions';

export interface AccountsState {
  accounts: IAccount[];
}

const initialState: AccountsState = {
  accounts: [],
};

export const accountsReducer = createReducer(
  initialState,
  on(loadAccountsSuccess, (state, action): AccountsState => {
    return {
      ...state,
      // @ts-ignore
      accounts: [...action.payload.accounts],
    };
  })
);
