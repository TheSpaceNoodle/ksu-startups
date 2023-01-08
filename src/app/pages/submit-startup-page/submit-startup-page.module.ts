import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubmitStartupPageRoutingModule } from './submit-startup-page-routing.module';
import { SubmitStartupPageComponent } from './submit-startup-page.component';

@NgModule({
  declarations: [SubmitStartupPageComponent],
  imports: [CommonModule, SubmitStartupPageRoutingModule],
})
export class SubmitStartupPageModule {}
