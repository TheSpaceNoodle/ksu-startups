import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupsPageComponent } from './startups-page.component';

const routes: Routes = [{ path: '', component: StartupsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupsPageRoutingModule {}
