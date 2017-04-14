import { v1 } from 'uuid';
import { storage } from '../config';

export const uploadFile = (file, cb) => {
  const storageRef = storage.ref('media/' + v1());
  const task = storageRef.put(file);
  task.on(
    'state_changed',
    () => {
      // progress
    },
    err => {
      console.warn(err);
    },
    () => {
      cb(task.snapshot.downloadURL);
    },
  );
};
