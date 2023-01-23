import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAllStartups, getUser } from './state';
import { getPartners } from './state/partners/partners.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'KSU Startups';

  constructor(private router: Router, private store: Store) {}

  showNav() {
    if (this.router.url === '/auth' || this.router.url.includes('/welcome'))
      return false;
    return true;
  }

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.store.dispatch(getAllStartups());
    this.store.dispatch(getPartners());
  }
}
