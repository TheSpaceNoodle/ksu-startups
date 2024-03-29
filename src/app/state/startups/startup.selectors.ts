import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { StartupsState } from './startups.reducer';

export const selectStartups = (state: AppState) => state.startupsState;
export const selectSubmitStartupMessage = createSelector(
  selectStartups,
  (startupsState: StartupsState) => startupsState.message
);

export const selectAllStartups = createSelector(
  selectStartups,
  (startupsState: StartupsState) => startupsState.startups
);

export const selectStartup = (props: { id: string }) =>
  createSelector(selectStartups, (startupsState: StartupsState) => {
    const startup = startupsState.startups.find(
      (startup) => startup.authorUid + '&' + startup.startupName === props.id
    );

    return startup ? startup : null;
  });
