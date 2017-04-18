const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.registerUser = functions.auth.user().onCreate(event => {
  const ref = admin.database().ref();
  const usersRef = ref.child('users');
  const { email, uid } = event.data;
  return usersRef.child(uid).set({ uid, email, username: email });
});

exports.notifyTest = functions.database
  .ref('/notify-test/{id}')
  .onWrite(event => {
    const ref = admin.database().ref();
    const messaging = admin.messaging();
    const { uid } = event.data.val();
    const task$ = require('./observables').getNotify$(uid, ref, messaging);
    return new Promise((resolve, reject) => {
      task$.subscribe(
        next => {
          console.log('notification success: ');
          console.log(next);
        },
        reject,
        resolve
      );
    });
  });
