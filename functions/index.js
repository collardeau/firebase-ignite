/* eslint comma-dangle: ["error", "never"] */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref();
const messaging = admin.messaging();
const usersRef = ref.child('users');
const tokensRef = ref.child('tokens');

function notify(uid, noti) {
  tokensRef.child(uid).once('value', snap => {
    const data = snap.val();
    if (!data) return;
    const tokens = Object.keys(data);
    setTimeout(
      // delay for testing
      () => {
        messaging.sendToDevice(tokens, noti).catch(err => {
          console.log(err);
        });
      },
      1000 * 5
    );
  });
}

exports.registerUser = functions.auth.user().onCreate(event => {
  const { email, uid } = event.data;
  usersRef.child(uid).set({ uid, email, username: email });
  return Promise.resolve();
});

exports.notifyTest = functions.database
  .ref('/notify-test/{id}')
  .onWrite(event => {
    const data = event.data.val();
    if (!data) return Promise.resolve();
    const { uid } = data;
    return notify(uid, {
      notification: {
        title: 'Test Notification',
        body: 'Good news, your pwa is receiving notifications',
        icon: 'android-chrome-192x192.png',
        click_action: 'https://google.com'
      }
    });
  });
