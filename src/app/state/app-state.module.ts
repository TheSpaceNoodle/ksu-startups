import { NgModule } from '@angular/core';
import { EffectsModule as NgrxEffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule as NgrxStoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';

@NgModule({
  imports: [
    NgrxStoreModule.forRoot(
      { authState: userReducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    NgrxEffectsModule.forRoot([UserEffects]),
    !environment.production
      ? NgrxStoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
  ],
  exports: [],
})
export class AppStoreModule {}
