import {Injectable} from '@angular/core';
import {Analytics, setUserId} from '@angular/fire/analytics';
import {
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  user,
  signOut,
  authState,
  UserCredential,
  User,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  CollectionReference,
  DocumentReference,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import {Observable, shareReplay} from 'rxjs';
import IUser from '../models/user.model';
import {delay, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User | null>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private usersCollection: CollectionReference;

  constructor(
    private auth: Auth,
    private analytics: Analytics,
    private db: Firestore,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {
    this.user$ = user(this.auth).pipe(shareReplay(1));
    this.usersCollection = collection(this.db, 'users');
    this.isAuthenticated$ = this.user$.pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
  }

  public signInWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        this.handleAuthSuccess(result);
        this.toast.success({
          detail: 'You have successfully logged in with Google account',
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public signInWithFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider())
      .then((result) => {
        this.handleAuthSuccess(result);
        this.toast.success({
          detail: 'You have successfully logged in with Facebook account',
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.handleAuthSuccess(result);
        this.toast.success({
          detail: 'You have successfully logged in',
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public async logout($event?: Event) {
    if ($event) $event.preventDefault();

    await signOut(this.auth);

    await this.router.navigateByUrl('/login');
  }

  private handleAuthSuccess(result: UserCredential): void {
    this.setUserData(result.user);
    authState(this.auth).subscribe((user) => {
      if (user) {
        this.router.navigate(['accounts']);
      }
    });
  }

  private async setUserData(user: any): Promise<void> {
    const userRef: DocumentReference = doc(this.db, `users/${user.uid}`);
    const userData: IUser = {
      email: user.email,
      displayName: user.displayName,
    };
    setUserId(this.analytics, user.id);
    return await setDoc(userRef, userData, {
      merge: true,
    });
  }
}
