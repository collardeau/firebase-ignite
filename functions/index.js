/* eslint comma-dangle: ["error", "never"] */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref();
const messaging = admin.messaging();
const usersRef = ref.child('users');
const tokensRef = ref.child('tokens');

function delay() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 3000);
  });
}

exports.registerUser = functions.auth.user().onCreate(event => {
  const { email, uid } = event.data;
  return usersRef.child(uid).set({ uid, email, username: email });
});

exports.notifyTest = functions.database
  .ref('/notify-test/{id}')
  .onWrite(event => {
    const data = event.data.val();
    const { uid } = data;
    return Promise.resolve()
      .then(() => tokensRef.child(uid).once('value'))
      .then(tokensSnap => {
        if (!tokensSnap.exists()) return Promise.reject('User has no tokens');
        const pushTokens = Object.keys(tokensSnap.val());
        return messaging.sendToDevice(pushTokens, {
          notification: {
            title: 'Test Notification',
            body: 'Good news, your pwa is receiving notifications',
            icon: 'android-chrome-192x192.png',
            click_action: 'https://google.com'
          }
        });
      })
      .then(delay) // allow user to put app in bg for self-notification
      .catch(console.warn);
  });
