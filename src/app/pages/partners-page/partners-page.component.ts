import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Partner } from 'src/app/state/partners/partners.reducer';
import { selectPartners } from 'src/app/state/partners/partners.selectors';

@Component({
  selector: 'app-partners-page',
  templateUrl: './partners-page.component.html',
  styleUrls: ['./partners-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersPageComponent implements OnInit {
  partners!: Observable<Partner[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.partners = this.store.select(selectPartners);
  }
}
