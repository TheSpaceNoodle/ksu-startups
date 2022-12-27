import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface User {
  displayName: string;
  email: string;
  metadata?: {
    creationTime?: string;
    lalastSignInTimest?: string;
  };
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

export const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, (state) => ({ ...state, loading: true })),
  on(UserActions.logInSuccess, (state, { uid }) => ({
    ...state,
    uid: uid,
    loading: false,
  })),
  on(UserActions.logInFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);
