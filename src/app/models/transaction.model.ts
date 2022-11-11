export interface ITransaction {
  account: string;
  uid: string;
  category: string;
  description: string;
  date: any;
  notes?: string;
  sum: number;
  transferFrom?: string;
}
