import { createAction, props } from '@ngrx/store';
import { Startup } from './startups.reducer';

export const submitStartup = createAction(
  '[Submit Startup Page] SubmitStartup',
  props<{ startupData: Startup; file: File }>()
);
export const submitStartupSuccess = createAction(
  '[Submit Startup Page] SubmitStartupSuccess'
);
