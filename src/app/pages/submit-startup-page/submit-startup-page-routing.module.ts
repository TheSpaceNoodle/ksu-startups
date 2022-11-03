import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitStartupPageComponent } from './submit-startup-page.component';

const routes: Routes = [{ path: '', component: SubmitStartupPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitStartupPageRoutingModule {}
