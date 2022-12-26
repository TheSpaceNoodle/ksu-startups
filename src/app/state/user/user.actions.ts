import { createAction, props } from '@ngrx/store';

export const logIn = createAction('[Auth Page] LogIn');
export const logInSuccess = createAction(
  '[Auth Page] LogInSuccess',
  props<{ uid: string }>()
);
export const logInFailed = createAction(
  '[Auth Page] LogInFailed',
  props<{ error: string }>()
);
export const logOut = createAction('[Auth Page] LogOut');
