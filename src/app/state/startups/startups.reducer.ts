import { Action, createReducer, on } from '@ngrx/store';
import { submitStartup, submitStartupSuccess } from './startups.actions';

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
  on(submitStartup, (state) => ({ ...state, message: 'submitting startups' })),
  on(submitStartupSuccess, (state) => ({
    ...state,
    message: 'startup submitted',
  }))
);

export const startupsReducer = (
  state: StartupsState | undefined,
  action: Action
) => _startupsReducer(state, action);
