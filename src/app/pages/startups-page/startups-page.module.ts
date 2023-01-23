import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { StartupsPageRoutingModule } from './startups-page-routing.module';
import { StartupsPageComponent } from './startups-page.component';

@NgModule({
  declarations: [StartupsPageComponent],
  imports: [CommonModule, StartupsPageRoutingModule, SharedModule],
})
export class StartupsPageModule {}
