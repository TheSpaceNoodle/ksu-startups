import { createAction, props } from '@ngrx/store';
import { Partner } from './partners.reducer';

export const getPartners = createAction(
  '[Partners Page] Retrieve All Partners'
);
export const getPartnersSuccess = createAction(
  '[Partners Page] Retrieve All Partners Success',
  props<{ partners: Partner[] }>()
);
