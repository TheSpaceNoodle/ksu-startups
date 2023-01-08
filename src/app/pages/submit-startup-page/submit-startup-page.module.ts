import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitStartupPageRoutingModule } from './submit-startup-page-routing.module';
import { SubmitStartupPageComponent } from './submit-startup-page.component';

@NgModule({
  declarations: [SubmitStartupPageComponent],
  imports: [CommonModule, SubmitStartupPageRoutingModule, ReactiveFormsModule],
})
export class SubmitStartupPageModule {}
