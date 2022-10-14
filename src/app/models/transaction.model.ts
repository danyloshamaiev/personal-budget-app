export interface ITransaction {
  account: string;
  uid: string;
  category: string;
  date: any; //TODO: Change it
  notes?: string;
  sum: number;
  transferFrom?: string;
}
