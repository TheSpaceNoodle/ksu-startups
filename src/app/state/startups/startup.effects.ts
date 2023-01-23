import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import {
  getAllStartups,
  getAllStartupsFailed,
  getAllStartupsSuccess,
  submitStartup,
  submitStartupSuccess,
} from './startups.actions';

@Injectable()
export class StartupEffects {
  $submitStartup = createEffect(() =>
    this.actions$.pipe(
      ofType(submitStartup),
      switchMap((data) =>
        of(this.fsService.submitStartup(data.startupData, data.file)).pipe(
          map(() => submitStartupSuccess())
        )
      )
    )
  );

  $getAllStartups = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllStartups),
      switchMap(() =>
        from(this.fsService.getAllStartups()).pipe(
          map((startups) => getAllStartupsSuccess({ startups: startups })),
          catchError((err) => [getAllStartupsFailed({ message: err })])
        )
      )
    )
  );

  constructor(private actions$: Actions, private fsService: FirestoreService) {}
}
