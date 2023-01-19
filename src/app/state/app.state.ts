import { PartnersState } from './partners/partners.reducer';
import { StartupsState } from './startups/startups.reducer';
import { AuthState } from './user/user.reducer';

export interface AppState {
  authState: AuthState;
  startupsState: StartupsState;
  partnersState: PartnersState;
}
