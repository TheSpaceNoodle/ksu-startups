import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectUser, setStuff } from 'src/app/state';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  user$!: Observable<any>;

  constructor(private store: Store<AppState>) {}

  showState() {
    this.user$.pipe(take(1)).subscribe((data) => console.log(data));
  }

  initializeState() {
    this.store.dispatch(setStuff());
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((data) => console.log(data));
    // this.store.dispatch(logIn());
  }
}
