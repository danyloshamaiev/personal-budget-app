import {Injectable} from '@angular/core';
import {getToken, Messaging, onMessage} from '@angular/fire/messaging';
import {EMPTY, from, Observable, share, tap} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  token$: Observable<any> = EMPTY;
  message$: Observable<any> = EMPTY;

  constructor(private messaging: Messaging) {
    this.token$ = from(
      navigator.serviceWorker
        .register('firebase-messaging-sw.js', {
          type: 'module',
          scope: '__',
        })
        .then((serviceWorkerRegistration) => {
          console.log('SW Registration: ', serviceWorkerRegistration);
          return getToken(messaging, {
            serviceWorkerRegistration,
            vapidKey: environment.firebase.vapidKey,
          });
        })
    ).pipe(
      tap((token) => console.log('FCM', {token})),
      share()
    );
    this.token$.subscribe((value) => console.log(value));
    this.message$ = new Observable((sub) =>
      onMessage(messaging, (it) => sub.next(it))
    ).pipe(tap((it) => console.log('FCM', it)));
  }
}
