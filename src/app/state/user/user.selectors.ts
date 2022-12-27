import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './user.reducer';

export const selectUser = (state: AppState) => state.user;
export const selectUserData = createSelector(selectUser, (a: AuthState) => a);
