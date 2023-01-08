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
  startupForm = new FormGroup({
    startupName: new FormControl(''),
    startupFinances: new FormControl(''),
    startupYouTubeLink: new FormControl(),
    startupDescription: new FormControl(''),
    startupHistory: new FormControl(''),
  });
  formFilled = false;

  constructor(private storageService: StorageService) {}

  onFileUpload(e: any) {
    this.storageService.upload(e.target.files[0]);
    console.log(this.startupForm.value);
    this.formFilled = true;
  }

  onSubmit(e: any) {
    console.log(this.startupForm.value);
  }

  ngOnInit(): void {}
}
