import {Injectable} from '@angular/core';
import {
  addDoc,
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
import slugify from 'slugify';
import {ITransaction} from '../models/transaction.model';
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

  public addUserTransaction(
    transaction: Partial<ITransaction>
  ): Observable<any> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const userRef: DocumentReference = doc(this.db, `users/${user?.uid}`);
        return from(
          addDoc(collection(this.db, 'transactions'), {
            ...transaction,
            uid: user?.uid,
          })
        )
          .pipe(
            concatMap(() => {
              return from(
                updateDoc(
                  userRef,
                  'totalBalance',
                  increment(transaction.sum ?? 0)
                )
              );
            })
          )
          .pipe(
            concatMap(async () => {
              const userDoc = await getDoc(userRef);
              const accounts = userDoc.get('accounts');
              const index = accounts.findIndex(
                (element: any) => element.id == transaction.account
              );
              accounts[index].balance += +(transaction.sum ?? 0);
              return from(updateDoc(userRef, 'accounts', accounts));
            })
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
              id: slugify(name, {lower: true}),
              balance: +initialBalance,
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
