import { messaging, ref } from '../config';

const tokensRef = ref.child('tokens');
const requestPermission = uid => {
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then(token => {
      return tokensRef.child(uid).child(token).set(true);
    })
    .catch(err => {
      console.log('refused permissions: ', err);
    });
};

export const setToken = uid => {
  messaging
    .getToken()
    .then(currentToken => {
      if (currentToken) {
        tokensRef.child(uid).child(currentToken).set(true);
      } else {
        requestPermission(uid);
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

const onTokenRefresh = () => {
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        console.info('Token refreshed.');
      })
      .catch(err => {
        console.log('Unable to retrieve refreshed token ', err);
      });
  });
};

onTokenRefresh();
