import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models';
import * as UserActions from './user.actions';

export const initialState: User = {
  displayName: '',
  email: '',
  uid: '',
  metadata: {
    createdAt: new Date(0),
    lastSignIn: new Date(),
  },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, (state, { user }) => ({
    displayName: user.displayName,
    email: user.email,
    uid: user.uid,
    metadata: user.metadata,
    photoUrl: user?.photoUrl,
  }))
);
