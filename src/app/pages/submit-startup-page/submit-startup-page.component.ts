import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Startup, submitStartup } from 'src/app/state';

@Component({
  selector: 'app-submit-startup-page',
  templateUrl: './submit-startup-page.component.html',
  styleUrls: ['./submit-startup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitStartupPageComponent implements OnInit {
  file: File | null = null;
  startupForm = new FormGroup({
    startupName: new FormControl(''),
    startupFinances: new FormControl(''),
    startupYouTubeLink: new FormControl(),
    startupDescription: new FormControl(''),
    startupHistory: new FormControl(''),
  });
  formFilled = this.startupForm.valid;

  constructor(private fsService: FirestoreService, private store: Store) {}

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
      data.startupDescription &&
      data.startupHistory &&
      this.file
    ) {
      let startupData: Startup = {
        startupName: data.startupName,
        startupFinances: data.startupFinances,
        startupYouTubeLink: data.startupYouTubeLink,
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

  ngOnInit(): void {}
}
