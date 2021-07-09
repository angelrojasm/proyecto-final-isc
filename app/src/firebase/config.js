import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '@env';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
