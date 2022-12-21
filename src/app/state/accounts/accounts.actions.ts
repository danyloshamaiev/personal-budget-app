import {createAction, props} from '@ngrx/store';
import {IAccount} from '../../models/account.model';

export const loadAccounts = createAction('[Accounts] Load Accounts');
export const loadAccountsSuccess = createAction(
  '[Accounts] Load Accounts Success',
  props<{accounts: IAccount[]}>()
);
export const addAccount = createAction(
  '[Accounts] Add Account',
  props<{account: Partial<IAccount>}>()
);

export const addAccountSuccess = createAction('[Accounts] Add Account Success');
