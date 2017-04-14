/* eslint-disable */

importScripts('https://www.gstatic.com/firebasejs/3.6.10/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/3.6.10/firebase-messaging.js'
);

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};

firebase.initializeApp(config);

firebase.messaging();
