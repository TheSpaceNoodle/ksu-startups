import { Action, createReducer, on } from '@ngrx/store';
import {
  getAllStartups,
  getAllStartupsFailed,
  getAllStartupsSuccess,
  submitStartup,
  submitStartupSuccess,
} from './startups.actions';

export interface Startup {
  startupName: string;
  startupFinances: string;
  startupYouTubeLink?: string;
  startupDescription: string;
  startupHistory: string;
  authorUid: string;
  startupImage: string;
}

export interface StartupsState {
  startups: Startup[];
  loading: boolean;
  message: string | null;
}

const initialState: StartupsState = {
  startups: [],
  loading: false,
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
