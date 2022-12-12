import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models';

export const logIn = createAction('[Auth Page] LogIn', props<{ user: User }>());
export const logOut = createAction('[Auth Page] LogOut');
export const signUp = createAction('[Auth Page] SignUp');
