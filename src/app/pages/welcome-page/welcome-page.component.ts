import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/shared/models/partner.model';
import { AppState } from 'src/app/state/app.state';
import { selectPartners } from 'src/app/state/partners/partners.selectors';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent implements OnInit {
  partners!: Observable<Partner[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.partners = this.store.select(selectPartners);
  }
}
