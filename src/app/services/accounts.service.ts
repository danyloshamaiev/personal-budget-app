import {Injectable} from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private db: Firestore) {}

  public getUserAccounts(uid: string) {
    return collectionData(
      query(collection(this.db, 'transactions'), where('uid', '==', uid))
    ).pipe(
      map((docs) => new Set(docs.map((doc) => doc?.['account']))),
      map((accountsSet) => Array.from(accountsSet.values()))
    );
  }
}
