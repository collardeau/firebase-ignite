import { firebaseAuth } from '../config';

export function registerWithEmail(email, pw, onError) {
  return (
    firebaseAuth()
      .createUserWithEmailAndPassword(email, pw)
      .catch(onError)
  );
}

export function login(email, pw, onError) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw).catch(onError);
}

export function logout() {
  return firebaseAuth().signOut();
}
