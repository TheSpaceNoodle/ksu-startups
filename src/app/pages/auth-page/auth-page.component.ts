import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, logIn, logOut } from 'src/app/state';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  login() {
    this.store.dispatch(logIn());
  }

  logOut() {
    this.store.dispatch(logOut());
  }

  ngOnInit(): void {}
}
