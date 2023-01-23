import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectSubmitStartupMessage,
  Startup,
  submitStartup,
} from 'src/app/state';
import { AppState } from 'src/app/state/app.state';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.startupMessage$ = this.store.select(selectSubmitStartupMessage);
  }

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
    let formValue = this.startupForm.value;
    if (
      formValue &&
      formValue.startupName &&
      formValue.startupFinances &&
      formValue.startupShortDesc &&
      formValue.startupDescription &&
      formValue.startupHistory &&
      this.file
    ) {
      const startupData: Startup = {
        startupName: formValue.startupName,
        startupFinances: formValue.startupFinances,
        startupYouTubeLink: formValue.startupYouTubeLink,
        startupShortDesc: formValue.startupShortDesc,
        startupDescription: formValue.startupDescription,
        startupHistory: formValue.startupHistory,
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

  // isFormValid() {}
}
