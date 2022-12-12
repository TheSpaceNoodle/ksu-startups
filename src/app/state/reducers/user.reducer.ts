import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models';
import * as UserActions from '../actions/user.actions';

export const initialState: User = {
  username: '',
  uid: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, (state, { user }) => ({
    username: user.username,
    uid: user.uid,
  }))
);
