import {IAccount} from './account.model';

export default interface IUser {
  email: string;
  password?: string;
  displayName: string;
  accounts?: IAccount[];
}
