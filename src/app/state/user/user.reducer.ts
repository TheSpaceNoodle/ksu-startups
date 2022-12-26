import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface AuthState {
  uid: string;
  error: string;
  loading: boolean;
}

const initialState: AuthState = {
  uid: '',
  error: '',
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, (state) => ({ ...state, loading: true })),
  on(UserActions.logInSuccess, (state, { uid }) => ({
    ...state,
    uid: uid,
  })),
  on(UserActions.logInFailed, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
