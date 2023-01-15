import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Startup } from 'src/app/state';
import { AppState } from 'src/app/state/app.state';
import { selectAllStartups } from 'src/app/state/startups/startup.selectors';

@Component({
  selector: 'app-startups-page',
  templateUrl: './startups-page.component.html',
  styleUrls: ['./startups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsPageComponent implements OnInit {
  startups$!: Observable<Startup[]>;

  constructor(private store: Store<AppState>, private af: FirestoreService) {}

  shit() {
    this.startups$ = this.af.getAllStartups();
  }

  ngOnInit(): void {
    this.startups$ = this.store.select(selectAllStartups);
  }
}
