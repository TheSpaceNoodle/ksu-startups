import { createAction, props } from '@ngrx/store';
import { Partner } from 'src/app/shared/models/partner.model';

export const getPartners = createAction(
  '[Partners Page] Retrieve All Partners'
);
export const getPartnersSuccess = createAction(
  '[Partners Page] Retrieve All Partners Success',
  props<{ partners: Partner[] }>()
);
