import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnersPageComponent } from './partners-page.component';

const routes: Routes = [{ path: '', component: PartnersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnersPageRoutingModule {}
