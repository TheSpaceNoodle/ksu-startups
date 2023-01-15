import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Startup, submitStartup } from 'src/app/state';
import { AppState } from 'src/app/state/app.state';
import { selectSubmitStartupMessage } from 'src/app/state/startups/startup.selectors';

@Component({
  selector: 'app-submit-startup-page',
  templateUrl: './submit-startup-page.component.html',
  styleUrls: ['./submit-startup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitStartupPageComponent implements OnInit {
  startupMessage$!: Observable<string | null>;
  file: File | null = null;
  startupForm = new FormGroup({
    startupName: new FormControl(''),
    startupFinances: new FormControl(''),
    startupYouTubeLink: new FormControl(),
    startupShortDesc: new FormControl(''),
    startupDescription: new FormControl(''),
    startupHistory: new FormControl(''),
  });
  formFilled = this.startupForm.valid;

  constructor(private store: Store<AppState>) {}

  onFileUpload(e: any) {
    this.file = e.target.files[0];
    if (
      this.file &&
      !(this.file.name.endsWith('.png') || this.file.name.endsWith('.jpg'))
    ) {
      this.file = null;
    }
  }

  onSubmit() {
    let data = this.startupForm.value;
    if (
      data &&
      data.startupName &&
      data.startupFinances &&
      data.startupShortDesc &&
      data.startupDescription &&
      data.startupHistory &&
      this.file
    ) {
      let startupData: Startup = {
        startupName: data.startupName,
        startupFinances: data.startupFinances,
        startupYouTubeLink: data.startupYouTubeLink,
        startupShortDesc: data.startupShortDesc,
        startupDescription: data.startupDescription,
        startupHistory: data.startupHistory,
        authorUid: '',
        startupImage: '',
      };
      this.store.dispatch(
        submitStartup({
          startupData: startupData,
          file: this.file,
        })
      );
    }
  }

  ngOnInit(): void {
    this.startupMessage$ = this.store.select(selectSubmitStartupMessage);
  }
}
