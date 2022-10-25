console.log('TEST')
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import {
  getMessaging,
  onBackgroundMessage,
  isSupported
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-sw.js';

const app = initializeApp({
  apiKey: 'AIzaSyCy2gtNYfK7c93_Vbv0cIUkeBxgUlHOc80',
  authDomain: 'personal-budget-87c40.firebaseapp.com',
  projectId: 'personal-budget-87c40',
  storageBucket: 'personal-budget-87c40.appspot.com',
  messagingSenderId: '916943491985',
  appId: '1:916943491985:web:5a53ae3c18a0316ab8c030',
  measurementId: 'G-96VC8RWG6H'
});

isSupported().then(isSupported => {
  if (isSupported) {
    console.log(app);
    const messaging = getMessaging(app);
    console.log(messaging);

    onBackgroundMessage(messaging, ({notification: {title, body, image}}) => {
      self.registration.showNotification(title, {body, icon: image || '/assets/icons/icon-72x72.png'});
    });
  }
});
