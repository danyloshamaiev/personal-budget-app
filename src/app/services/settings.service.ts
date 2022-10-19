import {Injectable} from '@angular/core';
import {
  doc,
  DocumentReference,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import {concatMap, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IUser from '../models/user.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private db: Firestore, private authService: AuthService) {}

  public getUserInfo(): Observable<IUser> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const userRef: DocumentReference = doc(this.db, `users/${user?.uid}`);
        return from(getDoc(userRef)).pipe(
          map((userSnapshot) => userSnapshot.data() as IUser)
        );
      })
    );
  }
}
