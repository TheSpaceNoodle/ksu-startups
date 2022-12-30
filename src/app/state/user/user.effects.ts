import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logIn),
      switchMap(() =>
        from(this.authService.login()).pipe(
          map((user) => UserActions.logInSuccess({ user: user })),
          catchError((error) => of(UserActions.logInFailed(error)))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      switchMap(() =>
        from(this.authService.checkSignedUser()).pipe(
          map((user) => {
            if (user) {
              /// User logged in
              return UserActions.logInSuccess({ user: user });
            } else {
              /// User not logged in
              return UserActions.logInFailed({ error: 'failed' });
            }
          })
        )
      )
    )
  );

  // getUser$ = createEffect(() =>
  //   this.actions$.pipe(ofType(UserActions.logInSuccess), switchMap(() =>))
  // );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private fs: FirestoreService
  ) {}
}
