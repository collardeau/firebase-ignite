import React from 'react';
import {
  compose,
  withState,
  branch,
  renderComponent,
  lifecycle,
  renderNothing,
} from 'recompose';
import { firebaseAuth, ref } from '../config';
import { setToken } from '../utils/messagingUtils';
import Login from './Login';
import User from './User';
import { Button } from './styled';

const Notify = ({ uid }) => (
  <div>
    <Button
      onClick={() => {
        ref.child('notify-test').push({ uid });
      }}
    >
      Notify Me
    </Button>
    <div>
      Make sure the app is not visible to receive a test notification. One will be sent
      {' '}
      <b>10 seconds</b> after a button click.
    </div>
  </div>
);

const Logout = () => (
  <div>
    <Button
      onClick={() => {
        firebaseAuth().signOut();
      }}
    >
      Logout
    </Button>
  </div>
);

const App = compose(
  withState('auth', 'updateAuth', null),
  withState('loading', 'updateLoading', true),
  lifecycle({
    componentDidMount() {
      firebaseAuth().onAuthStateChanged(auth => {
        this.props.updateAuth(auth);
        this.props.updateLoading(false);
        if (auth) {
          setToken(auth.uid);
        }
      });
    },
  }),
  branch(props => props.loading, renderNothing),
  branch(props => !props.auth, renderComponent(Login)),
)(({ auth }) => (
  <div>
    <h3>Logged In User</h3>
    <User uid={auth.uid} />
    <hr />
    <Notify uid={auth.uid} />
    <hr />
    <Logout />
  </div>
));

export default App;
