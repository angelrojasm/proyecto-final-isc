import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '@env';

// Initialize Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyCd8SDAJTwHulGn_qftD3DcnqVYkLcefA4',
  authDomain: 'proyecto-final-isc-b4477.firebaseapp.com',
  projectId: 'proyecto-final-isc-b4477',
  storageBucket: 'proyecto-final-isc-b4477.appspot.com',
  messagingSenderId: '199705432600',
  appId: '1:199705432600:web:71bd6d0c2b5d324517e96d',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
