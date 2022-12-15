import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models';

export const logIn = createAction('[Auth Page] LogIn');
export const logInSuccess = createAction(
  '[Auth Page] LogInSuccess',
  props<{ user: User }>()
);
export const logInFailed = createAction(
  '[Auth Page] LogInFailed',
  props<{ error: string }>()
);
export const logOut = createAction('[Auth Page] LogOut');
