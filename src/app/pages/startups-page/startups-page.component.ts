import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Startup } from 'src/app/shared/models/startup.model';
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
  elementsPassed = this.currentPage * 11;
  displayedStartupsAmount = 10;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.updateSelectedStartups();
  }

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
        data.length > this.elementsPassed
          ? (this.isNextActive = true)
          : (this.isNextActive = false);

        return this.currentPage === 0
          ? data.slice(
              this.currentPage,
              this.currentPage + this.displayedStartupsAmount
            )
          : data.slice(
              this.elementsPassed,
              this.elementsPassed + this.displayedStartupsAmount
            );
      })
    );
  }
}
