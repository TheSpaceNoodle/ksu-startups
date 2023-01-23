import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, switchMap } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { getPartners, getPartnersSuccess } from './partners.actions';

@Injectable()
export class PartnersEffects {
  $getPartners = createEffect(() =>
    this.actions$.pipe(
      ofType(getPartners),
      switchMap(() =>
        from(this.afStore.getPartners()).pipe(
          map((partners) => getPartnersSuccess({ partners: partners }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private afStore: FirestoreService) {}
}
