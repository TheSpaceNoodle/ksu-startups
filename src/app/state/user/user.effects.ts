import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logIn),
      switchMap(() =>
        from(this.authService.login()).pipe(
          map((uid) => UserActions.logInSuccess({ uid: uid })),
          catchError((error) => of(UserActions.logInFailed(error)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
