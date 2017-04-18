import firebase from 'firebase';

const stagingConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};

const prodConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};

const isProd = process.env.NODE_ENV === 'production';
const firebaseConfig = isProd ? prodConfig : stagingConfig;

firebase.initializeApp(firebaseConfig);
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const storage = firebase.storage();
export const messaging = firebase.messaging();
