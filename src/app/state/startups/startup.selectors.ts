import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { StartupsState } from './startups.reducer';

export const selectStartups = (state: AppState) => state.startupsState;
export const selectSubmitStartupMessage = createSelector(
  selectStartups,
  (startupsState: StartupsState) => startupsState.message
);
