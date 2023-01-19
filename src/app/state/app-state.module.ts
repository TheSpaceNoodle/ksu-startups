import { NgModule } from '@angular/core';
import { EffectsModule as NgrxEffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule as NgrxStoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { PartnersEffects } from './partners/partners.effects';
import { partnersReducer } from './partners/partners.reducer';
import { StartupEffects } from './startups/startup.effects';
import { startupsReducer } from './startups/startups.reducer';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';

@NgModule({
  imports: [
    NgrxStoreModule.forRoot(
      {
        authState: userReducer,
        startupsState: startupsReducer,
        partnersState: partnersReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    NgrxEffectsModule.forRoot([UserEffects, StartupEffects, PartnersEffects]),
    !environment.production ? NgrxStoreDevtoolsModule.instrument({}) : [],
  ],
  exports: [],
})
export class AppStoreModule {}
