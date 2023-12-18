import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: 'aimai-bba8c',
  storageBucket: 'aimai-bba8c.appspot.com',
  messagingSenderId: '1068407177179',
  appId: '1:1068407177179:web:42dcac5c36cb5fe05071fe',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// import type { FirebaseOptions } from 'firebase/app';
// import { initializeApp } from 'firebase/app';
// import type { Auth } from 'firebase/auth';
// import { connectAuthEmulator, getAuth } from 'firebase/auth';

// let cachedAuth: Auth | undefined;

// export const createAuth = () => {
//   if (cachedAuth !== undefined) return cachedAuth;

//   if (process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL !== undefined) {
//     // https://firebase.google.com/docs/emulator-suite/connect_auth
//     const auth = getAuth(initializeApp({ apiKey: 'fake-api-key', authDomain: location.hostname }));
//     connectAuthEmulator(auth, process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL, { disableWarnings: true });
//     cachedAuth = auth;

//     return auth;
//   } else {
//     const firebaseConfig: FirebaseOptions = JSON.parse(
//       process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '{}'
//     );
//     const auth = getAuth(initializeApp(firebaseConfig));
//     cachedAuth = auth;

//     return auth;
//   }
// };
