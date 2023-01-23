import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  getUser,
  logIn,
  logInFailed,
  logInSuccess,
  logOut,
} from './user.actions';

@Injectable()
export class UserEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(() =>
        from(this.authService.checkSignedUser()).pipe(
          map((user) => {
            if (user) {
              return logInSuccess({ user });
            } else {
              return logInFailed();
            }
          })
        )
      )
    )
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOut),
      switchMap(() => from(this.authService.logout()).pipe(map(() => logOut())))
    )
  );

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logIn),
      switchMap(() =>
        from(this.authService.login()).pipe(
          map((user) => logInSuccess({ user: user })),
          catchError(() => of(logInFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
