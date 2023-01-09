import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './user.reducer';

export const selectUser = (state: AppState) => state.authState;
export const selectUserData = createSelector(
  selectUser,
  (authState: AuthState) => authState.user
);
export const selectUserUid = createSelector(
  selectUser,
  (authState: AuthState) => authState.user?.uid
);
