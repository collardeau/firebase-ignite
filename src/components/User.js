import React from 'react';
import {
  compose,
  withState,
  branch,
  renderComponent,
  lifecycle,
  renderNothing,
  defaultProps,
  withHandlers,
} from 'recompose';
import { ref } from '../config';
import { Button, Input } from './styled';
import { uploadFile } from '../utils/storageUtils';

const usersRef = ref.child('users');

const AvatarUpload = compose(
  defaultProps({ uid: '' }),
  withState('file', 'changeFile', ''),
  withHandlers({
    onChange: ({ changeFile }) =>
      e => {
        changeFile(e.target.files[0]);
      },
    onUpload: ({ file, uid }) =>
      e => {
        e.preventDefault();
        uploadFile(file, url => {
          usersRef.child(uid).update({ avatar: url });
        });
      },
  }),
)(({ onUpload, onChange, file }) => (
  <form onSubmit={onUpload}>
    <Input type="file" onChange={onChange} />
    <Button disabled={!file}>Upload</Button>
  </form>
));

const User = compose(
  defaultProps({ uid: '' }),
  withState('user', 'updateUser', null),
  withState('loading', 'updateLoading', true),
  lifecycle({
    listener: null,
    componentDidMount() {
      const { uid, updateUser, updateLoading } = this.props;
      this.listener = usersRef.child(uid);
      this.listener.on('value', snap => {
        updateUser(snap.val());
        updateLoading(false);
      });
    },
    componentWillUnmount() {
      this.listener.off();
    },
  }),
  branch(props => props.loading, renderNothing),
  branch(props => !props.user, renderComponent(() => <div>No user match</div>)),
)(({ user }) => (
  <section>
    <div><b>email</b>: {user.email || 'unknown email'}</div>
    <div><b>uid</b>: {user.uid || 'unknown uid'}</div>
    <div>
      <h5>Avatar</h5>
      {user.avatar && <img src={user.avatar} alt="avatar" width="50%" />}
      <AvatarUpload uid={user.uid} />
    </div>
  </section>
));

export default User;
