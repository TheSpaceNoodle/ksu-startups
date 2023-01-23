import { Action, createReducer, on } from '@ngrx/store';
import { Startup } from 'src/app/shared/models/startup.model';
import {
  getAllStartups,
  getAllStartupsFailed,
  getAllStartupsSuccess,
  submitStartup,
  submitStartupSuccess,
} from './startups.actions';

export interface StartupsState {
  startups: Startup[];
  message: string | null;
}

const initialState: StartupsState = {
  startups: [],
  message: null,
};

const _startupsReducer = createReducer(
  initialState,
  on(submitStartup, (state) => ({
    ...state,
    message: 'submitting startups',
    loading: true,
  })),
  on(submitStartupSuccess, (state) => ({
    ...state,
    message: 'startup submitted',
    loading: false,
  })),

  on(getAllStartups, (state) => ({ ...state, loading: true })),
  on(getAllStartupsSuccess, (state, { startups }) => ({
    startups: startups,
    loading: false,
    message: null,
  })),
  on(getAllStartupsFailed, (state, { message }) => ({
    ...state,
    loading: false,
    message: message,
  }))
);

export const startupsReducer = (
  state: StartupsState | undefined,
  action: Action
) => _startupsReducer(state, action);
