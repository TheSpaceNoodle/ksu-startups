import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PartnersState } from './partners.reducer';

export const selectPartnersState = (state: AppState) => state.partnersState;

export const selectPartners = createSelector(
  selectPartnersState,
  (partnersState: PartnersState) => partnersState.partners
);
