import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

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

  constructor(private storageService: StorageService) {}

  onFileUpload(e: any) {
    this.file = e.target.files[0];
    if (
      this.file &&
      !(this.file.name.endsWith('.png') || this.file.name.endsWith('.jpg'))
    ) {
      this.file = null;
    }
    console.log(this.file);
  }

  onSubmit(e: any) {
    this.storageService.upload(e.target.files[0]);
    console.log(this.startupForm.value);
  }

  ngOnInit(): void {}
}
