import {Injectable} from '@angular/core';
import {
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {catchError, concatMap, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IUser from '../models/user.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private db: Firestore,
    private storage: Storage,
    private authService: AuthService
  ) {}

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

  public updateUserInfo(userInfo: Partial<IUser>): Observable<any> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const userRef: DocumentReference = doc(this.db, `users/${user?.uid}`);
        return from(updateDoc(userRef, userInfo));
      })
    );
  }

  public updateProfilePhoto(photo: File): Observable<any> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const storageRef = ref(
          this.storage,
          `users/${user?.uid}/profilePicture.png`
        );
        return from(uploadBytes(storageRef, photo));
      })
    );
  }

  public getProfilePhotoURL(): Observable<string> {
    return this.authService.user$.pipe(
      concatMap((user) => {
        const storageRef = ref(
          this.storage,
          `users/${user?.uid}/profilePicture.png`
        );
        return from(getDownloadURL(storageRef)).pipe(
          catchError(() => {
            const defaultRef = ref(
              this.storage,
              'users/default/profilePicture.png'
            );
            return from(getDownloadURL(defaultRef));
          })
        );
      })
    );
  }
}
