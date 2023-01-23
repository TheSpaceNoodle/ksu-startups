import { Action, createReducer, on } from '@ngrx/store';
import {
  getUser,
  logIn,
  logInFailed,
  logInSuccess,
  logOut,
  setRole,
} from './user.actions';

export interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
  roles: string[] | null;
  activeRole: string;
}
export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const _userReducer = createReducer(
  initialState,
  on(getUser, (state) => ({ ...state, loading: true })),
  on(logOut, (state) => ({ ...initialState })),
  on(logIn, (state) => ({ ...state, loading: true })),
  on(logInSuccess, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(logInFailed, (state) => ({
    ...state,
  })),
  on(setRole, (state, { user }) => ({ ...state, user: user }))
);

export const userReducer = (state: AuthState | undefined, action: Action) =>
  _userReducer(state, action);
