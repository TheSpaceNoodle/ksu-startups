import { createAction, props } from '@ngrx/store';
import { User } from './user.reducer';

export const getUser = createAction('[App] getUser');
export const logIn = createAction('[Auth Page] LogIn');
export const logInSuccess = createAction(
  '[Auth Page] LogInSuccess',
  props<{ user: User | null }>()
);
export const logInFailed = createAction(
  '[Auth Page] LogInFailed',
  props<{ error: string }>()
);
export const logOut = createAction('[Auth Page] LogOut');
export const setStuff = createAction('[Auth Page] setStuff');
