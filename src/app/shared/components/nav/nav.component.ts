import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { logOut, selectUserData, setRole } from 'src/app/state';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  user$!: Observable<User | null>;
  userChangerShown = false;

  constructor(private store: Store<AppState>) {}

  toggleUserChanger() {
    this.userChangerShown = !this.userChangerShown;
  }

  setRole(role: string, user: User) {
    const updatedUser = { ...user, activeRole: role };
    this.store.dispatch(setRole({ user: updatedUser }));
    this.userChangerShown = false;
  }

  logOut() {
    this.store.dispatch(logOut());
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserData);
  }
}
