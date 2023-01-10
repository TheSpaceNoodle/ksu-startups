import { createAction, props } from '@ngrx/store';
import { Startup } from './startups.reducer';

export const submitStartup = createAction(
  '[Submit Startup Page] Submit Startup',
  props<{ startupData: Startup; file: File }>()
);
export const submitStartupSuccess = createAction(
  '[Submit Startup Page] Submit Startup Success'
);
export const getAllStartups = createAction('[Startups Page] Get All Startups');
export const getAllStartupsSuccess = createAction(
  '[Startups Page] Get All Startups Success',
  props<{ startups: Startup[] }>()
);
export const getAllStartupsFailed = createAction(
  '[Startups Page] Get All Startups Failed',
  props<{ message: string }>()
);
