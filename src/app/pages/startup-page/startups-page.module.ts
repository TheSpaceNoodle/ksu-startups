import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StartupPageComponent } from './startup-page.component';
import { StartupsPageRoutingModule } from './startups-page-routing.module';

@NgModule({
  declarations: [StartupPageComponent],
  imports: [CommonModule, StartupsPageRoutingModule],
})
export class StartupsPageModule {}
