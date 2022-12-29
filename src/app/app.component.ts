import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { getUser } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'KSU Startups';

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getUser());
  }
}
