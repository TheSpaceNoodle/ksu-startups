import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const getCurrentUser = createAction('[App] Get User');

export const logOut = createAction('[Auth Page] Log Out');

export const logIn = createAction('[Auth Page] Log In');
export const logInSuccess = createAction(
  '[Auth Page] Log In Success',
  props<{ user: User | null }>()
);
export const logInFailed = createAction('[Auth Page] Log In Failed');

export const setRole = createAction(
  '[App] Set User Role',
  props<{ user: User }>()
);
