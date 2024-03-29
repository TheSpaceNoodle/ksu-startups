import { Action, createReducer, on } from '@ngrx/store';
import { Partner } from 'src/app/shared/models/partner.model';
import { getPartners, getPartnersSuccess } from './partners.actions';

export interface PartnersState {
  partners: Partner[];
}

const initialState: PartnersState = {
  partners: [],
};

const _partnersReducer = createReducer(
  initialState,
  on(getPartners, (state) => ({ ...state })),
  on(getPartnersSuccess, (state, { partners }) => ({
    ...state,
    partners: partners,
  }))
);

export const partnersReducer = (
  state: PartnersState | undefined,
  action: Action
) => _partnersReducer(state, action);
