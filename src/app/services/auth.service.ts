import {Injectable} from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  user,
  signOut,
  authState,
  UserCredential,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  CollectionReference,
  DocumentReference,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import {MessageService} from 'primeng/api';
import {Observable, of} from 'rxjs';
import IUser from '../models/user.model';
import {delay, map, filter, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ActivatedRoute, NavigationEnd} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: CollectionReference;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: Auth,
    private db: Firestore,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.usersCollection = collection(this.db, 'users');
    this.isAuthenticated$ = user(this.auth).pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
      });
  }

  public signInWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        this.handleAuthSuccess(result);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
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

    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
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
    return await setDoc(userRef, userData, {
      merge: true,
    });
  }
}
