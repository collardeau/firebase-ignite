/* eslint comma-dangle: 0 */
const { Observable: Obs } = require('rxjs');

function getNotify$(uid, ref, messaging) {
  const userTokensRef = ref.child('tokens').child(uid);
  return (
    Obs.fromPromise(userTokensRef.once('value'))
      .switchMap(snap => {
        const tokens = snap.val();
        if (tokens) return Obs.of(Object.keys(tokens));
        return Obs.empty(); // no tokens
      })
      .switchMap(tokens =>
        Obs.fromPromise(
          messaging.sendToDevice(tokens, {
            notification: {
              title: 'Test Notification',
              body: 'You requested to be notified some moments ago.',
              icon: 'android-chrome-192x192.png',
              click_action: 'https://google.com'
            }
          })
        )
      )
      // delay for demo only
      // allow user time to put app in background
      // note this delay will be reflected in the functions log
      .delay(2000)
  );
}

module.exports = {
  getNotify$
};
