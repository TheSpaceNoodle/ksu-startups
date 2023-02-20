import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Startup } from 'src/app/shared/models/startup.model';
import { AppState } from 'src/app/state/app.state';
import { selectStartup } from 'src/app/state/startups/startup.selectors';

@Component({
  selector: 'app-startup-page',
  templateUrl: './startup-page.component.html',
  styleUrls: ['./startup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupPageComponent implements OnInit {
  startupData$!: Observable<Startup | null>;
  isContactsShown = false;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.startupData$ = this.store.select(
      selectStartup({ id: this.router.url.replace('/startups/', '') })
    );
  }

  showContacts() {
    this.isContactsShown = true;
  }
}
