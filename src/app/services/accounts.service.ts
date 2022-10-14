import {Injectable} from '@angular/core';
import {
  arrayUnion,
  collection,
  collectionData,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  increment,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {concatMap, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private db: Firestore, private authService: AuthService) {}

  public getUserAccounts(): Observable<any> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const userRef: DocumentReference = doc(this.db, `users/${user?.uid}`);
        return from(getDoc(userRef)).pipe(
          map((userSnapshot) => userSnapshot.get('accounts'))
        );
      })
    );
  }

  public getUserTransactions(accountID: string): Observable<any> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        return from(
          collectionData(
            query(
              collection(this.db, 'transactions'),
              where('uid', '==', user?.uid),
              where('account', '==', accountID)
            )
          )
        );
      })
    );
  }

  public getUserTotalBalance(): Observable<any> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const userRef: DocumentReference = doc(this.db, `users/${user?.uid}`);
        return from(getDoc(userRef)).pipe(
          map((userSnapshot) => userSnapshot.get('totalBalance'))
        );
      })
    );
  }

  public addUserAccount(name: string, initialBalance: number): Observable<any> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const userRef: DocumentReference = doc(this.db, `users/${user?.uid}`);
        return from(
          updateDoc(
            userRef,
            'accounts',
            arrayUnion({
              name,
              id: name, // TODO: CHANGE
              balance: initialBalance,
            })
          )
        ).pipe(
          concatMap(() => {
            return from(
              updateDoc(userRef, 'totalBalance', increment(initialBalance))
            );
          })
        );
      })
    );
  }
}
