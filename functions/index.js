const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref();
const usersRef = ref.child('users');

exports.registerUser = functions.auth.user().onCreate(event => {
  const { email, uid } = event.data;
  usersRef.child(uid).set({ uid, email, username: email });
  return Promise.resolve();
});
