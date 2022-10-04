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
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import IUser from '../models/user.model';
import {delay, map, filter, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ActivatedRoute, NavigationEnd} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: CollectionReference<DocumentData>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: Auth,
    private db: Firestore,
    private router: Router,
    private route: ActivatedRoute
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
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public signInWithFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.setUserData(result.user);
        authState(this.auth).subscribe((user) => {
          if (user) {
            this.router.navigate(['accounts']);
          }
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public async createUser(userData: IUser) {
    if (!userData.password) throw new Error(`Password not provided!`);

    const userCred = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );

    if (!userCred.user) throw new Error(`User can't be found`);

    // await this.usersCollection.doc(userCred.user.uid).set({
    //   displayName: userData.displayName,
    //   email: userData.email,
    // });

    // await userCred.user.updateProfile({
    //   displayName: userData.displayName,
    // });
  }

  public async logout($event?: Event) {
    if ($event) $event.preventDefault();

    await signOut(this.auth);

    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }

  private setUserData(user: any) {
    const userRef: DocumentReference = doc(this.db, `users/${user.uid}`);
    const userData: IUser = {
      email: user.email,
      displayName: user.displayName,
    };
    return setDoc(userRef, userData, {
      merge: true,
    });
  }
}
