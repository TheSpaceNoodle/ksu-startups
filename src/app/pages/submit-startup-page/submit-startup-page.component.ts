import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Startup } from 'src/app/shared/models/startup.model';
import { User } from 'src/app/shared/models/user.model';
import {
  selectSubmitStartupMessage,
  selectUserData,
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
  currentUser$!: Observable<User | null>;
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
    this.currentUser$ = this.store.select(selectUserData);
  }

  onFileUpload(eTarget: EventTarget | null) {
    const files = (eTarget as HTMLInputElement).files;

    if (
      files &&
      (files[0].name.endsWith('.png') || files[0].name.endsWith('.jpg'))
    ) {
      this.file = files[0];
    } else {
      this.file = null;
    }
  }

  onSubmit(uid: string, email: string) {
    const formValue = this.startupForm.value;
    if (this.isFormValid()) {
      const startupData: Startup = {
        startupName: formValue.startupName as string,
        startupFinances: formValue.startupFinances as string,
        startupYouTubeLink: formValue.startupYouTubeLink as string,
        startupShortDesc: formValue.startupShortDesc as string,
        startupDescription: formValue.startupDescription as string,
        startupHistory: formValue.startupHistory as string,
        authorUid: uid,
        authorEmail: email,
        startupImage: '',
      };
      this.store.dispatch(
        submitStartup({
          startupData: startupData,
          file: this.file as File,
        })
      );
    }
  }

  isFormValid(): boolean {
    const formValue = this.startupForm.value;

    return (
      !!formValue &&
      !!formValue.startupName &&
      !!formValue.startupFinances &&
      !!formValue.startupShortDesc &&
      !!formValue.startupDescription &&
      !!formValue.startupHistory &&
      !!this.file
    );
  }
}
