import React from 'react';
import {
  compose,
  withState,
  branch,
  renderComponent,
  lifecycle,
  renderNothing,
} from 'recompose';
import { firebaseAuth } from '../config';
import Login from './Login';
import User from './User';
import { Button } from './styled';

const App = compose(
  withState('auth', 'updateAuth', null),
  withState('loading', 'updateLoading', true),
  lifecycle({
    componentDidMount() {
      firebaseAuth().onAuthStateChanged(auth => {
        this.props.updateAuth(auth);
        this.props.updateLoading(false);
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
    <Button
      onClick={() => {
        firebaseAuth().signOut();
      }}
    >
      Logout
    </Button>
  </div>
));

export default App;
