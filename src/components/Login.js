import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Input, Button } from './styled';
import { registerWithEmail, login } from '../utils/authUtils';

const Login = compose(
  withState('email', 'updateEmail', ''),
  withState('pw', 'updatePw', ''),
  withHandlers({
    onEmailChange: ({ updateEmail }) => e => {
      updateEmail(e.target.value);
    },
    onPwChange: ({ updatePw }) => e => {
      updatePw(e.target.value);
    },
    reset: ({ updateEmail, updatePw }) => () => {
      updateEmail('');
      updatePw('');
    }
  }),
  withHandlers({
    onLogin: ({ email, pw, reset }) => () => {
      login(email, pw, console.warn);
      reset();
    },
    onRegister: ({ email, pw, reset }) => () => {
      registerWithEmail(email, pw, console.warn);
      reset();
    }
  })
)(({ email, pw, onEmailChange, onPwChange, onLogin, onRegister }) => (
  <div>
    <Input
      value={email}
      type="email"
      onChange={onEmailChange}
      placeholder="email"
    />
    <Input
      value={pw}
      type="password"
      onChange={onPwChange}
      placeholder="password"
    />
    <Button onClick={onRegister}>Register</Button> or
    <Button onClick={onLogin}>Login</Button>
  </div>
));

export default Login;
