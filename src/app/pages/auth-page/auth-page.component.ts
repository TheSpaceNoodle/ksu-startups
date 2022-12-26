import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AuthState, logIn } from 'src/app/state';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  login() {
    this.store.dispatch(logIn());
  }

  ngOnInit(): void {
    onAuthStateChanged(getAuth(), (user) => {
      console.log(user?.uid);
    });
  }
}
