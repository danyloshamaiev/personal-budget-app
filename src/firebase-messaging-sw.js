import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import {
  getMessaging,
  onBackgroundMessage,
  isSupported,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-sw.js';

const app = initializeApp({
  apiKey: 'AIzaSyCy2gtNYfK7c93_Vbv0cIUkeBxgUlHOc80',
  authDomain: 'personal-budget-87c40.firebaseapp.com',
  projectId: 'personal-budget-87c40',
  storageBucket: 'personal-budget-87c40.appspot.com',
  messagingSenderId: '916943491985',
  appId: '1:916943491985:web:5a53ae3c18a0316ab8c030',
  measurementId: 'G-96VC8RWG6H',
  vapidKey:
    'BBROEZKsySi4j6qpvprnBqMtw8gFJ1f01oo4BQ1m-UrHLxoPOoYjVavMA3KbriXAbtECgUkONoi00LWpsgFz8Rg',
});

isSupported().then((isSupported) => {
  if (isSupported) {
    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, ({notification: {title, body, image}}) => {
      self.registration.showNotification(title, {
        body,
        icon: image || '/assets/icons/icon-72x72.png',
      });
    });
  }
});
