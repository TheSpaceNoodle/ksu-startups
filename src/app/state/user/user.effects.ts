import * as UserActions from './user.actions';
import Actions
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private authService: AuthService) {}
}
