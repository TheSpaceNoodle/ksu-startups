import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
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
  currentPage = 0;
  isNextActive = true;

  constructor(private store: Store<AppState>, private af: FirestoreService) {}

  next() {
    this.currentPage += 1;
    this.updateSelectedStartups();
  }

  previous() {
    this.currentPage -= 1;
    this.updateSelectedStartups();
  }

  updateSelectedStartups() {
    this.startups$ = this.store.select(selectAllStartups).pipe(
      map((data) => {
        data.length > this.currentPage * 11
          ? (this.isNextActive = true)
          : (this.isNextActive = false);

        return this.currentPage == 0
          ? data.slice(this.currentPage, this.currentPage + 10)
          : data.slice(this.currentPage * 11, this.currentPage * 11 + 10);
      })
    );
  }

  ngOnInit(): void {
    this.updateSelectedStartups();
  }
}
