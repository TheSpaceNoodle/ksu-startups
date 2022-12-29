import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/state';
import { AppState } from 'src/app/state/app.state';
import { selectUserData } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  user$!: Observable<User>;

  constructor(private store: Store<AppState>) {
    this.user$ = store.select(selectUserData);
  }

  ngOnInit(): void {
    this.user$.subscribe((data) => console.log(data));
  }
}
