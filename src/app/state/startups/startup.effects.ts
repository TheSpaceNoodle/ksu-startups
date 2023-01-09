import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { submitStartup, submitStartupSuccess } from './startups.actions';

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

  constructor(private actions$: Actions, private fsService: FirestoreService) {}
}
