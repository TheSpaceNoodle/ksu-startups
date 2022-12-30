import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}
export interface AuthState {
  user: User | null;
  uid: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  uid: null,
  error: null,
  loading: false,
};

const _userReducer = createReducer(
  initialState,
  on(UserActions.getUser, (state) => ({ ...state, loading: true })),
  on(UserActions.logIn, (state) => ({ ...state, loading: true })),
  on(UserActions.logInSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null,
  })),
  on(UserActions.logInFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(UserActions.setStuff, (state) => ({
    ...state,
    user: {
      displayName: 'suck',
      email: 'my',
      photoURL: 'huge',
      uid: 'cock',
    },
  }))
);

export const userReducer = (state: AuthState | undefined, action: Action) =>
  _userReducer(state, action);
