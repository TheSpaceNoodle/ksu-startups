import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupPageComponent } from './startup-page.component';

const routes: Routes = [{ path: '', component: StartupPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupsPageRoutingModule {}
